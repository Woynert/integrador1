
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS update_vehicle_row;
DROP PROCEDURE IF EXISTS register_vehicle;

-- prepared

DELIMITER //
CREATE PROCEDURE update_vehicle_row (
	IN _tipo_vehiculo CHAR(250),
	IN _marca  CHAR(250),
	IN _modelo CHAR(250),
	IN _generacion CHAR(250),
	IN _placa  CHAR(250),
	IN _estado CHAR(250),
	IN _fecha  CHAR(250),
	IN _precio INT,
	IN _id     INT
)
BEGIN

	UPDATE vehiculos
	SET tipo_vehiculo = _tipo_vehiculo,
		marca      = _marca,
		modelo     = _modelo,
		generacion = _generacion,
		placa      = _placa,
		estado     = _estado,
		fecha      = _fecha,
		precio     = _precio
	WHERE id = _id;

END ;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE register_vehicle (
	IN _tipo_vehiculo CHAR(250),
	IN _marca  CHAR(250),
	IN _modelo CHAR(250),
	IN _generacion CHAR(250),
	IN _placa  CHAR(250),
	IN _estado CHAR(250),
	IN _fecha  CHAR(250),
	IN _precio INT
)
BEGIN

	INSERT INTO vehiculos
	(tipo_vehiculo,
		marca     ,
		modelo    ,
		generacion,
		placa     ,
		estado    ,
		fecha     ,
		precio    )

	VALUES (_tipo_vehiculo,
		_marca,
		_modelo,
		_generacion,
		_placa,
		_estado,
		_fecha,
		_precio);

END ;
//
DELIMITER ;


-- execute it

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);

-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
