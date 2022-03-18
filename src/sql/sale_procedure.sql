
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS sales_pending_new;
DROP PROCEDURE IF EXISTS sales_pending_delete;

-- procedure

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

