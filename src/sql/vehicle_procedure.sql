
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS vehicle_update_row;
DROP PROCEDURE IF EXISTS vehicle_register;
DROP PROCEDURE IF EXISTS vehicle_filter_search;
DROP PROCEDURE IF EXISTS vehicle_price_search;

-- update

DELIMITER //
CREATE PROCEDURE vehicle_update_row (
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_marca      CHAR(250),
	IN ar_modelo     CHAR(250),
	IN ar_generacion CHAR(250),
	IN ar_placa      CHAR(250),
	IN ar_condicion  CHAR(250),
	IN ar_precio     BIGINT UNSIGNED,
	IN ar_id         INT
)
BEGIN

	-- get current price

	DECLARE p_cur_precio BIGINT UNSIGNED;
	SELECT precio INTO @p_cur_precio FROM vehicles WHERE id = ar_id;

	-- update

	UPDATE vehicles
	SET
		tipo_vehiculo = IF (ISNULL(ar_tipo_vehiculo), tipo_vehiculo, ar_tipo_vehiculo),
		marca      = IF (ISNULL(ar_marca), marca, ar_marca),
		modelo     = IF (ISNULL(ar_modelo), modelo, ar_modelo),
		generacion = IF (ISNULL(ar_generacion), generacion, ar_generacion),
		placa      = IF (ISNULL(ar_placa), placa, ar_placa),
		condicion  = IF (ISNULL(ar_condicion), condicion, ar_condicion),
		precio     = IF (ISNULL(ar_precio), precio, ar_precio)
	WHERE id = ar_id;

	-- record price update

	IF ar_precio != @p_cur_precio THEN

		INSERT INTO vehicle_price (
			id_vehicle,
			precio
			)
		VALUES(
			ar_id,
			ar_precio
			);

	END IF;

END ;
//
DELIMITER ;

-- register

DELIMITER //
CREATE PROCEDURE vehicle_register (
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_marca  CHAR(250),
	IN ar_modelo CHAR(250),
	IN ar_generacion CHAR(250),
	IN ar_placa  CHAR(250),
	IN ar_condicion CHAR(250),
	IN ar_precio BIGINT UNSIGNED
)
BEGIN

	-- insert vehicle

	INSERT INTO vehicles
	(tipo_vehiculo,
		marca     ,
		modelo    ,
		generacion,
		placa     ,
		condicion ,
		precio    )

	VALUES (
		ar_tipo_vehiculo,
		ar_marca,
		ar_modelo,
		ar_generacion,
		ar_placa,
		ar_condicion,
		ar_precio);

	-- SELECT LAST_INSERT_ID();

	-- record price

	INSERT INTO vehicle_price(
		id_vehicle,
		precio)

	VALUES(
		(SELECT LAST_INSERT_ID()),
		ar_precio
	);

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


-- get price history

DELIMITER //
CREATE PROCEDURE vehicle_price_search (
	IN ar_id_vehicle INT
)
BEGIN

	SELECT
		DATE_FORMAT(fecha, '%Y-%m-%d %H:%i') AS `fecha`,
		precio
	FROM
		vehicle_price
	WHERE
		id_vehicle = ar_id_vehicle
	;

END ;
//
DELIMITER ;

-- test

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);

-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
