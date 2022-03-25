
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS vehicle_update_row;
DROP PROCEDURE IF EXISTS vehicle_register;
DROP PROCEDURE IF EXISTS vehicle_filter_search;

-- update

DELIMITER //
CREATE PROCEDURE vehicle_update_row (
	IN _tipo_vehiculo CHAR(250),
	IN _marca      CHAR(250),
	IN _modelo     CHAR(250),
	IN _generacion CHAR(250),
	IN _placa      CHAR(250),
	IN _condicion  CHAR(250),
	IN _precio     BIGINT UNSIGNED,
	IN _id         INT
)
BEGIN

	UPDATE vehicles
	SET
		tipo_vehiculo = IF (ISNULL(_tipo_vehiculo), tipo_vehiculo, _tipo_vehiculo),
		marca      = IF (ISNULL(_marca), marca, _marca),
		modelo     = IF (ISNULL(_modelo), modelo, _modelo),
		generacion = IF (ISNULL(_generacion), generacion, _generacion),
		placa      = IF (ISNULL(_placa), placa, _placa),
		condicion  = IF (ISNULL(_condicion), condicion, _condicion),
		precio     = IF (ISNULL(_precio), precio, _precio)
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
	IN _condicion CHAR(250),
	IN _precio BIGINT UNSIGNED
)
BEGIN

	INSERT INTO vehicles
	(tipo_vehiculo,
		marca     ,
		modelo    ,
		generacion,
		placa     ,
		condicion ,
		precio    )

	VALUES (_tipo_vehiculo,
		_marca,
		_modelo,
		_generacion,
		_placa,
		_condicion,
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
	IN ar_condicion     CHAR(250),
	IN ar_fecha_inicio  DATE,
	IN ar_fecha_fin     DATE,
	IN ar_precio_max    BIGINT UNSIGNED,
	IN ar_estado        CHAR(250),
	IN ar_page_count    INT
)
BEGIN

	DECLARE p_range  INT;
	DECLARE p_offset INT;

	SET p_range  = 10;
	SET p_offset = ar_page_count * p_range;

	SELECT max(precio) INTO @precio_max FROM vehicles;

	-- select values

	SELECT
		id,
		tipo_vehiculo,
		marca,
		modelo,
		generacion,
		placa,
		condicion,
		DATE_FORMAT(fecha, '%Y-%m-%d') AS `fecha`,
		precio,
		estado
	FROM vehicles
	WHERE
	tipo_vehiculo LIKE CONCAT('%',ar_tipo_vehiculo,'%') AND
	marca         LIKE CONCAT('%',ar_marca,'%') AND
	modelo        LIKE CONCAT('%',ar_modelo,'%') AND
	generacion    LIKE CONCAT('%',ar_generacion,'%') AND
	placa         LIKE CONCAT('%',ar_placa,'%') AND
	condicion     LIKE CONCAT('%',ar_condicion,'%') AND
	fecha         BETWEEN ar_fecha_inicio AND ar_fecha_fin AND
	precio <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max ) AND
	estado        LIKE CONCAT('%',ar_estado,'%')
	LIMIT p_range OFFSET p_offset
	;

	-- get count

	SELECT count(*) AS `count`
	FROM vehicles
	WHERE
	tipo_vehiculo LIKE CONCAT('%',ar_tipo_vehiculo,'%') AND
	marca         LIKE CONCAT('%',ar_marca,'%') AND
	modelo        LIKE CONCAT('%',ar_modelo,'%') AND
	generacion    LIKE CONCAT('%',ar_generacion,'%') AND
	placa         LIKE CONCAT('%',ar_placa,'%') AND
	condicion     LIKE CONCAT('%',ar_condicion,'%') AND
	fecha         BETWEEN ar_fecha_inicio AND ar_fecha_fin AND
	precio <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max ) AND
	estado        LIKE CONCAT('%',ar_estado,'%')
	;

END ;
//
DELIMITER ;


-- test

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);

-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
