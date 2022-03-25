
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS client_update_row;
DROP PROCEDURE IF EXISTS client_register;
DROP PROCEDURE IF EXISTS client_filter_search;
DROP PROCEDURE IF EXISTS mytest;

-- update

DELIMITER //
CREATE PROCEDURE client_update_row (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_telefono   CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE,
	IN ar_id         INT
)
BEGIN

	-- IF (ISNULL(ar_), , 

	UPDATE clients
	SET nombres   = IF (ISNULL(ar_nombres),nombres , ar_nombres),
		apellidos = IF (ISNULL(ar_apellidos),apellidos, ar_apellidos),
		cedula    = IF (ISNULL(ar_cedula),cedula, ar_cedula),
		domicilio = IF (ISNULL(ar_domicilio),domicilio, ar_domicilio),
		telefono  = IF (ISNULL(ar_telefono),telefono, ar_telefono),
		correo    = IF (ISNULL(ar_correo),correo, ar_correo),
		fecha_nacimiento = IF (ISNULL(ar_nacimiento),fecha_nacimiento, ar_nacimiento)
	WHERE id = ar_id;

END ;
//
DELIMITER ;

-- register

DELIMITER //
CREATE PROCEDURE client_register (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_telefono    CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE
)
BEGIN

	INSERT INTO clients
		(
		nombres,
		apellidos ,
		cedula    ,
		domicilio ,
		telefono   ,
		correo    ,
		fecha_nacimiento
		)

	VALUES
		(
		ar_nombres,
		ar_apellidos ,
		ar_cedula    ,
		ar_domicilio ,
		ar_telefono   ,
		ar_correo    ,
		ar_nacimiento
		);

END ;
//
DELIMITER ;

-- search by filters

DELIMITER //
CREATE PROCEDURE client_filter_search (
	IN ar_nombres           CHAR(250),
	IN ar_apellidos         CHAR(250),
	IN ar_cedula            CHAR(250),
	IN ar_domicilio         CHAR(250),
	IN ar_telefono           CHAR(250),
	IN ar_correo            CHAR(250),
	IN ar_nacimiento_inicio DATE,
	IN ar_nacimiento_fin    DATE,
	IN ar_registro_inicio   DATE,
	IN ar_registro_fin      DATE,
	IN ar_page_count        INT
)
BEGIN

	DECLARE p_range  INT;
	DECLARE p_offset INT;

	SET p_range  = 10;
	SET p_offset = ar_page_count * p_range;

	-- get number

	SELECT
		id,
		nombres,
		apellidos,
		cedula,
		domicilio,
		telefono,
		correo,
		DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS `fecha_nacimiento`,
		DATE_FORMAT(fecha_registro, '%Y-%m-%d') AS `fecha_registro`
	FROM clients
	WHERE
	nombres    LIKE CONCAT('%',ar_nombres,'%')   AND
	apellidos  LIKE CONCAT('%',ar_apellidos,'%') AND
	cedula     LIKE CONCAT('%',ar_cedula,'%')    AND
	domicilio  LIKE CONCAT('%',ar_domicilio,'%') AND
	telefono   LIKE CONCAT('%',ar_telefono,'%')  AND
	correo     LIKE CONCAT('%',ar_correo,'%')    AND
	fecha_nacimiento BETWEEN ar_nacimiento_inicio AND ar_nacimiento_fin AND
	fecha_registro   BETWEEN ar_registro_inicio   AND ar_registro_fin
	LIMIT p_range OFFSET p_offset
	;

END ;
//
DELIMITER ;

/*DELIMITER //
CREATE PROCEDURE mytest (
	IN ar_nombres           CHAR(250),
	IN ar_apellidos         CHAR(250)
)
BEGIN

	SELECT *
	FROM clients
	WHERE nombres LIKE ar_nombres
	;

END ;
//
DELIMITER ;*/

-- test

-- CALL client_filter_search ("a", "a", "0", "", ".com", "1900-01-01", "2000-01-01", "1900-01-01", "3000-01-01");

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);



-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);



/*
DELIMITER //
CREATE PROCEDURE mytest (
	IN ar_nombres           CHAR(250),
	IN ar_apellidos         CHAR(250)
)
BEGIN

	SELECT *
	FROM clients
	WHERE nombres LIKE ar_nombres
	;

END ;
//
DELIMITER ;
*/
