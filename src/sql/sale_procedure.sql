
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS sales_pending_new;
DROP PROCEDURE IF EXISTS sales_pending_delete;
DROP PROCEDURE IF EXISTS sale_filter_search;
DROP PROCEDURE IF EXISTS sale_confirm_payment;
DROP PROCEDURE IF EXISTS sale_cancel_payment;
DROP PROCEDURE IF EXISTS sale_get_facture_info;

-- procedure

-- create

DELIMITER //
CREATE PROCEDURE sales_pending_new (
    IN ar_id_client   INT,
    IN ar_id_employee INT,
    IN ar_marca         CHAR(250),
    IN ar_id_from_marca INT,
    IN ar_responsible    CHAR(50),
    IN ar_discount_perce INT
)
BEGIN

	-- declare vars

	DECLARE p_subtotal  BIGINT UNSIGNED;
	DECLARE p_total     BIGINT UNSIGNED;
	DECLARE p_discount  BIGINT UNSIGNED;
	DECLARE p_tax       BIGINT UNSIGNED;

	DECLARE p_tax_perce INT;
	SET @p_tax_perce = 3; -- static tax

	-- check stock

	SET @p_stock = (
		SELECT (cantidad > 0)
		FROM   vehicles
		WHERE
		marca = ar_marca AND
		id_from_marca = ar_id_from_marca
		LIMIT 1);


	-- interrupt

	IF NOT @p_stock THEN

		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not stock available!';

	END IF;

	-- reduce available units

	UPDATE vehicles v
	SET v.cantidad = v.cantidad -1
	WHERE
		v.marca = ar_marca AND
		v.id_from_marca = ar_id_from_marca;

	-- update status

	CALL vehicle_update_stock_status (ar_marca, ar_id_from_marca);

	-- get base price

	SET @p_subtotal = (
		SELECT precio
		FROM   vehicles
		WHERE
			marca = ar_marca AND
			id_from_marca = ar_id_from_marca
		LIMIT 1);

	-- apply discount & taxes

	SET @p_discount = @p_subtotal * (ar_discount_perce/100);
	SET @p_tax      = @p_subtotal * (@p_tax_perce/100);

	SET @p_total = @p_subtotal - @p_discount + @p_tax;

	-- insert

	INSERT INTO sales (
		id_client,
		id_employee,
		marca,
		id_from_marca,
		responsible,
		subtotal,
		discount,
		tax,
		total
	)
	VALUES (
		ar_id_client,
		ar_id_employee,
		ar_marca,
		ar_id_from_marca,
		IF (ar_responsible = '', "concesionaria", ar_responsible),
		@p_subtotal,
		ar_discount_perce,
		@p_tax_perce,
		@p_total
	);

END ;
//
DELIMITER ;

-- delete

DELIMITER //
CREATE PROCEDURE sales_pending_delete (
    IN ar_id_sale INT
)
BEGIN

	-- TODO: Only delete sales with state 'PENDIENTE'

	DELETE FROM sales
	WHERE id = ar_id_sale;

END ;
//
DELIMITER ;

-- filter search

DELIMITER //
CREATE PROCEDURE sale_filter_search (
	IN ar_cedula CHAR(250),
	IN ar_modelo CHAR(250),
	IN ar_precio_max BIGINT UNSIGNED,
	IN ar_state      CHAR(250),
	IN ar_fecha_inicio  DATE,
	IN ar_fecha_fin     DATE,
	IN ar_page_count    INT
)
BEGIN

	DECLARE p_range  INT;
	DECLARE p_offset INT;

	SET p_range  = 10;
	SET p_offset = ar_page_count * p_range;

	SELECT max(precio) INTO @precio_max FROM vehicles;

	-- get values

	SELECT
		sp.id,
		sp.state,
		c.id id_client,
		c.nombres,
		c.apellidos,
		c.cedula,
		v.id id_vehicle,
		v.marca,
		v.modelo,
		v.generacion,
		v.precio,
		DATE_FORMAT(sp.created, '%Y-%m-%d') AS `created`
	FROM
		sales sp,
		clients c,
		vehicles v
	WHERE
		sp.id_client = c.id AND
		sp.marca         = v.marca AND
		sp.id_from_marca = v.id_from_marca AND
		c.cedula     LIKE CONCAT('%',ar_cedula,'%') AND
		v.modelo     LIKE CONCAT('%',ar_modelo,'%') AND
		sp.state     LIKE CONCAT('%',ar_state,'%') AND
		v.precio  <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max ) AND
		sp.created BETWEEN ar_fecha_inicio AND ar_fecha_fin
	LIMIT p_range OFFSET p_offset
	;

	-- get count

	SELECT count(*) AS `count`
	FROM
		sales sp,
		clients c,
		vehicles v
	WHERE
		sp.id_client = c.id AND
		sp.marca         = v.marca AND
		sp.id_from_marca = v.id_from_marca AND
		c.cedula     LIKE CONCAT('%',ar_cedula,'%') AND
		v.modelo     LIKE CONCAT('%',ar_modelo,'%') AND
		sp.state     LIKE CONCAT('%',ar_state,'%') AND
		v.precio  <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max ) AND
		sp.created BETWEEN ar_fecha_inicio AND ar_fecha_fin
	;

END ;
//
DELIMITER ;

-- confirm payment

DELIMITER //
CREATE PROCEDURE sale_confirm_payment (
	IN ar_id_sale INT,
	IN ar_method CHAR(50)
)
BEGIN

	-- record payment

	UPDATE
		sales
	SET
		state  = "PAGADO",
		payed  = CURRENT_TIMESTAMP(),
		payment_method = ar_method
	WHERE
		id = ar_id_sale
	;

	-- return info

	SELECT
		v.marca AS `marca`,
		v.id_from_marca AS `id_vehiculo`,
		s.subtotal AS `precio_venta`,
		DATE_FORMAT(s.payed, '%Y/%m/%d') AS `fecha_venta`
	FROM
		sales s,
		vehicles v
	WHERE
		s.id = ar_id_sale AND
		v.id_from_marca = s.id_from_marca AND
		v.marca = s.marca
	;

END ;
//
DELIMITER ;

-- cancel payment

DELIMITER //
CREATE PROCEDURE sale_cancel_payment (
	IN ar_id_sale INT
)
BEGIN

	-- cannot cancel an already canceled payment

	SET @p_already_canceled = (
		SELECT (s.state = "CANCELADO")
		FROM   sales s
		WHERE  s.id = ar_id_sale
		);

	-- interrupt

	IF @p_already_canceled THEN

		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sale already canceled';

	END IF;

	-- increase available units

	UPDATE
		vehicles v,
		sales s
	SET
		v.cantidad = v.cantidad +1
	WHERE
		s.id = ar_id_sale AND
		s.marca = v.marca AND
		s.id_from_marca = v.id_from_marca
		;

	-- get vehicle identity

	SELECT s.marca, s.id_from_marca
	INTO @p_marca, @p_id_from_marca
	FROM
		sales s
	WHERE
		s.id = ar_id_sale
	;

	-- update status

	CALL vehicle_update_stock_status (@p_marca, @p_id_from_marca);

	-- cancel

	UPDATE
		sales
	SET
		state  = "CANCELADO",
		payed  = NULL,
		payment_method = NULL
	WHERE
		id = ar_id_sale
	;

END ;
//
DELIMITER ;

-- facture

DELIMITER //
CREATE PROCEDURE sale_get_facture_info (
	IN ar_id_sale INT
)
BEGIN

	SELECT
		s.id AS `id_sale`,
		s.responsible, -- "Consecionaria Binaria Co."
		DATE_FORMAT(s.created, '%Y-%m-%d') AS `created`,
		DATE_FORMAT(s.payed, '%Y-%m-%d') AS `payed`,

		c.nombres,
		c.apellidos,
		c.cedula,
		c.domicilio,
		c.telefono,

		v.tipo_vehiculo,
		v.marca,
		v.modelo,
		v.generacion,
		v.condicion,

		s.subtotal,
		s.discount,
		s.tax,
		s.total
	FROM
		sales s,
		clients c,
		employees e,
		vehicles v
	WHERE
		s.id            = ar_id_sale AND
		s.id_client     = c.id AND
		s.id_employee   = e.id AND
		s.marca         = v.marca AND
		s.id_from_marca = v.id_from_marca
	;

END ;
//
DELIMITER ;
