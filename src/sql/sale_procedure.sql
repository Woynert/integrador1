
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
    IN ar_id_vehicle  INT,
    IN ar_responsible CHAR(50),
    IN ar_discount_perce INT
)
BEGIN

	-- declare vars

	DECLARE p_subtotal  INT;
	DECLARE p_total     FLOAT;
	DECLARE p_discount  FLOAT;
	DECLARE p_tax       FLOAT;

	DECLARE p_tax_perce INT;
	SET @p_tax_perce = 3; -- static tax

	-- TODO: check is available 'DISPONIBLE'
	-- set is no longer available 'EN TRAMITE'

	UPDATE vehicles
	SET    estado = 'EN TRAMITE'
	WHERE  id = ar_id_vehicle;

	-- set vars

	SET @p_subtotal = (
		SELECT precio
		FROM   vehicles
		WHERE  id = ar_id_vehicle);

	-- apply discount & taxes

	SET @p_discount = @p_subtotal * (ar_discount_perce/100);
	SET @p_tax      = @p_subtotal * (@p_tax_perce/100);

	SET @p_total = @p_subtotal - @p_discount + @p_tax;
	-- SELECT @p_subtotal, @p_discount, @p_tax, @p_total;

	-- insert

	INSERT INTO sales (
		id_client,
		id_employee,
		id_vehicle,
		responsible,
		subtotal,
		discount,
		tax,
		total
	)
	VALUES (
		ar_id_client,
		ar_id_employee,
		ar_id_vehicle,
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
	IN ar_fecha_inicio  DATE,
	IN ar_fecha_fin     DATE
)
BEGIN

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
		sp.id_client  = c.id AND
		sp.id_vehicle = v.id AND
		c.cedula   LIKE CONCAT('%',ar_cedula,'%') AND
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

END ;
//
DELIMITER ;

-- cancel payment

DELIMITER //
CREATE PROCEDURE sale_cancel_payment (
	IN ar_id_sale INT
)
BEGIN

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
		v.placa,
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
		s.id          = ar_id_sale AND
		s.id_client   = c.id AND
		s.id_employee = e.id AND
		s.id_vehicle  = v.id
	;

END ;
//
DELIMITER ;
