
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS vehicle_update_or_register;
DROP PROCEDURE IF EXISTS vehicle_update_row;
DROP PROCEDURE IF EXISTS vehicle_register;
DROP PROCEDURE IF EXISTS vehicle_filter_search;
DROP PROCEDURE IF EXISTS vehicle_price_search;
DROP PROCEDURE IF EXISTS vehicle_update_stock_status;

-- update_or_register

DELIMITER //
CREATE PROCEDURE vehicle_update_or_register (
	IN ar_marca         CHAR(250),
	IN ar_id_from_marca INT UNSIGNED,
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_modelo     CHAR(250),
	IN ar_generacion CHAR(250),
	IN ar_condicion  CHAR(250),
	IN ar_precio     BIGINT UNSIGNED,
	IN ar_cantidad   INT UNSIGNED
)
BEGIN

	-- does it exists

	DECLARE p_exists BOOLEAN;

	SELECT COUNT(id) > 0 INTO @p_exists
	FROM
		vehicles
	WHERE
		id_from_marca = ar_id_from_marca AND
		marca = ar_marca;

	-- record price update

	IF @p_exists THEN

		-- update
		CALL vehicle_update_row(
			ar_marca,
			ar_id_from_marca,
			ar_tipo_vehiculo,
			ar_modelo,
			ar_generacion,
			ar_condicion,
			ar_precio,
			ar_cantidad
		);

	ELSE
		-- create
		CALL vehicle_register(
			ar_marca,
			ar_id_from_marca,
			ar_tipo_vehiculo,
			ar_modelo,
			ar_generacion,
			ar_condicion,
			ar_precio,
			ar_cantidad
		);

	END IF;

END ;
//
DELIMITER ;

-- update

DELIMITER //
CREATE PROCEDURE vehicle_update_row (
	IN ar_marca         CHAR(250),
	IN ar_id_from_marca INT UNSIGNED,
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_modelo     CHAR(250),
	IN ar_generacion CHAR(250),
	IN ar_condicion  CHAR(250),
	IN ar_precio     BIGINT UNSIGNED,
	IN ar_cantidad   INT UNSIGNED
)
BEGIN

	-- get current price

	DECLARE p_cur_precio BIGINT UNSIGNED;
	SELECT precio INTO @p_cur_precio FROM vehicles
	WHERE
		marca = ar_marca AND
		id_from_marca = ar_id_from_marca;

	-- update

	UPDATE vehicles
	SET
		tipo_vehiculo = IF (ISNULL(ar_tipo_vehiculo), tipo_vehiculo, ar_tipo_vehiculo),
		marca      = IF (ISNULL(ar_marca), marca, ar_marca),
		modelo     = IF (ISNULL(ar_modelo), modelo, ar_modelo),
		generacion = IF (ISNULL(ar_generacion), generacion, ar_generacion),
		condicion  = IF (ISNULL(ar_condicion), condicion, ar_condicion),
		precio     = IF (ISNULL(ar_precio), precio, ar_precio),
		cantidad   = IF (ISNULL(ar_cantidad), cantidad, ar_cantidad)
	WHERE
		marca = ar_marca AND
		id_from_marca = ar_id_from_marca;

	-- record price update

	IF ar_precio != @p_cur_precio THEN

		INSERT INTO vehicle_price (
			marca,
			id_from_marca,
			precio
			)
		VALUES(
			ar_marca,
			ar_id_from_marca,
			ar_precio
			);

	END IF;

END ;
//
DELIMITER ;

-- register

DELIMITER //
CREATE PROCEDURE vehicle_register (
	IN ar_marca         CHAR(250),
	IN ar_id_from_marca INT UNSIGNED,
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_modelo     CHAR(250),
	IN ar_generacion CHAR(250),
	IN ar_condicion  CHAR(250),
	IN ar_precio     BIGINT UNSIGNED,
	IN ar_cantidad   INT UNSIGNED
)
BEGIN

	DECLARE p_id_from_marca INT UNSIGNED;

	-- remote

	IF ar_id_from_marca > 0 THEN

		SET p_id_from_marca = ar_id_from_marca;

	ELSE

		-- local

		SELECT max(id) + 1 INTO p_id_from_marca FROM vehicles WHERE marca = "conbin";

	END IF;

	-- insert vehicle

	INSERT INTO vehicles(
		marca        ,
		id_from_marca,
		tipo_vehiculo,
		modelo    ,
		generacion,
		condicion ,
		precio    ,
		cantidad
	)

	VALUES (
		ar_marca,
		p_id_from_marca,
		ar_tipo_vehiculo,
		ar_modelo,
		ar_generacion,
		ar_condicion,
		ar_precio,
		ar_cantidad
	);

	-- record price

	INSERT INTO vehicle_price(
		marca,
		id_from_marca,
		precio)

	VALUES(
		ar_marca,
		p_id_from_marca,
		ar_precio
	);

END ;
//
DELIMITER ;


-- search by filters

DELIMITER //
CREATE PROCEDURE vehicle_filter_search (
	IN ar_marca         CHAR(250),
	IN ar_tipo_vehiculo CHAR(250),
	IN ar_modelo        CHAR(250),
	IN ar_generacion    CHAR(250),
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
		id_from_marca,
		tipo_vehiculo,
		marca,
		modelo,
		generacion,
		condicion,
		precio,
		estado,
		cantidad
		-- DATE_FORMAT(fecha, '%Y-%m-%d') AS `fecha`
	FROM
		vehicles
	WHERE
	tipo_vehiculo LIKE CONCAT('%',ar_tipo_vehiculo,'%') AND
	marca         LIKE CONCAT('%',ar_marca,'%') AND
	modelo        LIKE CONCAT('%',ar_modelo,'%') AND
	generacion    LIKE CONCAT('%',ar_generacion,'%') AND
	condicion     LIKE CONCAT('%',ar_condicion,'%') AND
	fecha         BETWEEN ar_fecha_inicio AND ar_fecha_fin AND
	precio <= IF ( ar_precio_max = 0 , @precio_max , ar_precio_max ) AND
	estado        LIKE CONCAT('%',ar_estado,'%')
	ORDER BY marca
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
	IN ar_marca         CHAR(250),
	IN ar_id_from_marca INT UNSIGNED
)
BEGIN

	SELECT
		DATE_FORMAT(fecha, '%Y-%m-%d %H:%i') AS `fecha`,
		precio
	FROM
		vehicle_price
	WHERE
		marca = ar_marca AND
		id_from_marca = ar_id_from_marca
	;

END ;
//
DELIMITER ;

-- update availability

DELIMITER //
CREATE PROCEDURE vehicle_update_stock_status (
	IN ar_marca         CHAR(250),
	IN ar_id_from_marca INT UNSIGNED
)
BEGIN

	UPDATE vehicles v
	SET
		v.estado = IF(v.cantidad > 0, "DISPONIBLE", "VENDIDO")
	WHERE
		marca = ar_marca AND
		id_from_marca = ar_id_from_marca
	;

END ;
//
DELIMITER ;

