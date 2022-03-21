
USE integrador

-- drop

DROP PROCEDURE IF EXISTS login;

-- login

DELIMITER //
CREATE PROCEDURE login (
    IN ar_user     CHAR(250),
    IN ar_password CHAR(250)
)
BEGIN

	SELECT
		id, nombres, apellidos, role
	FROM
		employees
	WHERE
		correo   = ar_user AND
		password = ar_password
	;

END ;
//
DELIMITER ;

-- logout
/*
DELIMITER //
CREATE PROCEDURE logout (
    IN ar_user     CHAR(250)
)
BEGIN

	UPDATE
		employees
	SET
		state = 'offline'
	WHERE
		correo   = ar_user
	;

END ;
//
DELIMITER ;
*/
