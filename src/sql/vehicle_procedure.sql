
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS vehicle_update_row;
DROP PROCEDURE IF EXISTS vehicle_register;
DROP PROCEDURE IF EXISTS vehicle_filter_search;

-- update

DELIMITER //
CREATE PROCEDURE vehicle_update_row (
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

	UPDATE vehicles
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

-- register

DELIMITER //
CREATE PROCEDURE vehicle_register (
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

	INSERT INTO vehicles
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


-- search by filters

DELIMITER //
CREATE PROCEDURE vehicle_filter_search (
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_marca         CHAR(250),
	IN ar_modelo        CHAR(250),
	IN ar_generacion    CHAR(250),
	IN ar_placa         CHAR(250),
	IN ar_estado        CHAR(250),
	IN ar_fecha_inicio  DATE,
	IN ar_fecha_fin     DATE,
	IN ar_precio_max    INT UNSIGNED
)
BEGIN

	SELECT max(precio) INTO @precio_max FROM vehicles;

	SELECT * FROM view_vehicles
	WHERE
	tipo       LIKE CONCAT('%',ar_tipo_vehiculo,'%') AND
	marca      LIKE CONCAT('%',ar_marca,'%') AND
	modelo     LIKE CONCAT('%',ar_modelo,'%') AND
	generacion LIKE CONCAT('%',ar_generacion,'%') AND
	placa      LIKE CONCAT('%',ar_placa,'%') AND
	estado     LIKE CONCAT('%',ar_estado,'%') AND
	fecha      BETWEEN ar_fecha_inicio AND ar_fecha_fin AND
	precio <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max )
	;

END ;
//
DELIMITER ;


-- test

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);

-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
