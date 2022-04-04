
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
		password = SHA2(ar_password,0)
	;

END ;
//
DELIMITER ;
