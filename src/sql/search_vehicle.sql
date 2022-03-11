
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS search_filter_vehicle;

-- search by filters

DELIMITER //
CREATE PROCEDURE search_filter_vehicle (
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

	SELECT max(precio) INTO @precio_max FROM vehiculos;

	SELECT * FROM view_vehiculos
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
