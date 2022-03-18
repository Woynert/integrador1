
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS sales_pending_new;
DROP PROCEDURE IF EXISTS sales_pending_delete;
DROP PROCEDURE IF EXISTS sale_filter_search;

-- procedure

-- create

DELIMITER //
CREATE PROCEDURE sales_pending_new (
    IN ar_id_client  INT,
    IN ar_id_vehicle INT
)
BEGIN

	-- TODO: check is available 'DISPONIBLE'

	-- set is no longer available 'EN TRAMITE'

	UPDATE vehicles
	SET estado = 'EN TRAMITE'
	WHERE id = ar_id_vehicle;

	-- insert

	INSERT INTO sales_pending (id_client, id_vehicle)
	VALUES (ar_id_client, ar_id_vehicle);

END ;
//
DELIMITER ;

-- delete

DELIMITER //
CREATE PROCEDURE sales_pending_delete (
    IN ar_id_sale INT
)
BEGIN

	DELETE FROM sales_pending
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

	SELECT sp.id, sp.state, c.cedula, v.modelo, v.precio, sp.created
	FROM
		sales_pending sp,
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
