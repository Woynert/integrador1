
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS employee_update_row;
DROP PROCEDURE IF EXISTS employee_register;
DROP PROCEDURE IF EXISTS employee_filter_search;

-- update

DELIMITER //
CREATE PROCEDURE employee_update_row (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE,
    IN ar_role       INT,
    IN ar_password   CHAR(250),
	IN ar_id         INT
)
BEGIN

	UPDATE employees
	SET nombres   = IF (ISNULL(ar_nombres), nombres, ar_nombres),
		apellidos = IF (ISNULL(ar_apellidos), apellidos, ar_apellidos),
		domicilio = IF (ISNULL(ar_domicilio), domicilio, ar_domicilio),
		cedula    = IF (ISNULL(ar_cedula), cedula, ar_cedula),
		correo    = IF (ISNULL(ar_correo), correo, ar_correo),
		fecha_nacimiento = IF (ISNULL(ar_nacimiento), fecha_nacimiento, ar_nacimiento),
		role      = IF (ISNULL(ar_role), role, ar_role),
		password  = IF (ISNULL(ar_password), password, ar_password)
	WHERE id = ar_id;

END ;
//
DELIMITER ;

-- register

DELIMITER //
CREATE PROCEDURE employee_register (
    IN ar_nombres    CHAR(250),
    IN ar_apellidos  CHAR(250),
    IN ar_domicilio  CHAR(250),
    IN ar_cedula     CHAR(250),
    IN ar_correo     CHAR(250),
    IN ar_nacimiento DATE, -- IN ar_registro   DATE,
    IN ar_role       INT,
    IN ar_password   CHAR(250)
)
BEGIN

	INSERT INTO employees
		(
		nombres,
		apellidos ,
		domicilio ,
		cedula    ,
		correo    ,
		fecha_nacimiento,
		fecha_registro,
		role,
		password
		)

	VALUES
		(
		ar_nombres,
		ar_apellidos ,
		ar_domicilio ,
		ar_cedula    ,
		ar_correo    ,
		ar_nacimiento,
		CURRENT_TIMESTAMP,
		ar_role,
		ar_password
		);

END ;
//
DELIMITER ;

-- filter search

DELIMITER //
CREATE PROCEDURE employee_filter_search (
	IN ar_nombres           CHAR(250),
	IN ar_apellidos         CHAR(250),
	IN ar_domicilio         CHAR(250),
	IN ar_cedula            CHAR(250),
	IN ar_correo            CHAR(250),
	IN ar_nacimiento_inicio DATE,
	IN ar_nacimiento_fin    DATE,
	IN ar_registro_inicio   DATE,
	IN ar_registro_fin      DATE,
	IN ar_role              INT
)
BEGIN

	SELECT
		id,
		nombres,
		apellidos,
		domicilio,
		cedula,
		correo,
		DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS `fecha_nacimiento`,
		DATE_FORMAT(fecha_registro, '%Y-%m-%d') AS `fecha_registro`,
		role
	FROM employees
	WHERE
	nombres    LIKE CONCAT('%',ar_nombres,'%')   AND
	apellidos  LIKE CONCAT('%',ar_apellidos,'%') AND
	domicilio  LIKE CONCAT('%',ar_domicilio,'%') AND
	cedula     LIKE CONCAT('%',ar_cedula,'%')    AND
	correo     LIKE CONCAT('%',ar_correo,'%')    AND
	fecha_nacimiento BETWEEN ar_nacimiento_inicio AND ar_nacimiento_fin AND
	fecha_registro   BETWEEN ar_registro_inicio   AND ar_registro_fin AND
	(role = ar_role OR ar_role = 0)
	;

END ;
//
DELIMITER ;

-- test
-- call employee_register ("Reider", "Chaner", "cll 15-50", "100158190", "chareider@woy.net", '1980-10-05', 1, '123456');

-- CALL employee_filter_search ("e", "", "", "", ".net", "1900-01-01", "2000-01-01", "1900-01-01", "3000-01-01", 0);
