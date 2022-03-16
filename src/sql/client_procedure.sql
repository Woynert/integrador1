
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS client_update_row;
DROP PROCEDURE IF EXISTS client_register;
DROP PROCEDURE IF EXISTS client_filter_search;

-- update

DELIMITER //
CREATE PROCEDURE client_update_row (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE,
    IN ar_registro   DATE,
	IN ar_id         INT
)
BEGIN

	UPDATE clients
	SET nombres   = ar_nombres,
		apellidos = ar_apellidos,
		domicilio = ar_domicilio,
		cedula    = ar_cedula,
		correo    = ar_correo,
		fecha_nacimiento = ar_nacimiento,
		fecha_registro   = ar_registro
	WHERE id = ar_id;

END ;
//
DELIMITER ;

-- register

DELIMITER //
CREATE PROCEDURE client_register (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE,
    IN ar_registro   DATE
)
BEGIN

	INSERT INTO clients
		(
		nombres,
		apellidos ,
		domicilio ,
		cedula    ,
		correo    ,
		fecha_nacimiento,
		fecha_registro
		)

	VALUES
		(
		ar_nombres,
		ar_apellidos ,
		ar_domicilio ,
		ar_cedula    ,
		ar_correo    ,
		ar_nacimiento,
		ar_registro
		);

END ;
//
DELIMITER ;

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

-- CALL client_filter_search ("a", "a", "0", "", ".com", "1900-01-01", "2000-01-01", "1900-01-01", "3000-01-01");

-- CALL update_vehicle_row ("Moto", "Toyota" ,"Prius" ,"2008","ABQ10",'NUEVO', '2001-11-13', 1501800, 1);



-- CALL register_vehicle ("Moto", "Mercedes" ,"Prius" ,"2008","ZOK10",'USADO', '2001-11-13', 1501800);
