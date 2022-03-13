
USE integrador;

-- drop

--DROP PROCEDURE IF EXISTS vehicle_update_row;
--DROP PROCEDURE IF EXISTS vehicle_register;
DROP PROCEDURE IF EXISTS vehicle_filter_search;

-- update

/*DELIMITER //
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
DELIMITER ;*/


-- search by filters

DELIMITER //
CREATE PROCEDURE client_filter_search (
	IN ar_nombres           CHAR(250),
	IN ar_apellidos         CHAR(250),
	IN ar_domicilio         CHAR(250),
	IN ar_cedula            CHAR(250),
	IN ar_correo            CHAR(250),
	IN ar_nacimiento_inicio DATE,
	IN ar_nacimiento_fin    DATE,
	IN ar_registro_inicio   DATE,
	IN ar_registro_fin      DATE
)
BEGIN

	SELECT * FROM view_clients
	WHERE
	nombres    LIKE CONCAT('%',ar_nombres,'%')   AND
	apellidos  LIKE CONCAT('%',ar_apellidos,'%') AND
	domicilio  LIKE CONCAT('%',ar_domicilio,'%') AND
	cedula     LIKE CONCAT('%',ar_cedula,'%')    AND
	correo     LIKE CONCAT('%',ar_correo,'%')    AND
	nacimiento BETWEEN ar_nacimiento_inicio AND ar_nacimiento_fin AND
	registro   BETWEEN ar_registro_inicio   AND ar_registro_fin
	;

END ;
//
DELIMITER ;


-- test

CALL client_filter_search ("a", "a", "0", "", ".com",
"1900-01-01", "2000-01-01", "1900-01-01", "3000-01-01");

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);

-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
