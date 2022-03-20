
USE integrador;

-- drop

DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS client_column_data;

-- create

CREATE TABLE IF NOT EXISTS clients
(
    id                   INT       AUTO_INCREMENT PRIMARY KEY,
    nombres              CHAR(250) NULL DEFAULT NULL,
    apellidos            CHAR(250) NULL DEFAULT NULL,
    domicilio            CHAR(250) NULL DEFAULT NULL,
    cedula               CHAR(250) NULL DEFAULT NULL,
    correo               CHAR(250) NULL DEFAULT NULL,
    fecha_nacimiento     DATE NULL DEFAULT NULL,
    fecha_registro       DATETIME DEFAULT CURRENT_TIMESTAMP());

-- Data type
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS client_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL
	-- printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO client_column_data (event, property, datatype, defvalue)
VALUES
("FILTER", "nombres"         , 0, ''),
("FILTER", "apellidos"       , 0, ''),
("FILTER", "domicilio"       , 0, ''),
("FILTER", "cedula"          , 0, ''),
("FILTER", "correo"          , 0, ''),
("FILTER", "fecha_nacimiento", 2, ''),
("FILTER", "fecha_registro"  , 2, ''),
("EDIT", "nombres"         , 0, ''),
("EDIT", "apellidos"       , 0, ''),
("EDIT", "domicilio"       , 0, ''),
("EDIT", "cedula"          , 0, ''),
("EDIT", "correo"          , 0, ''),
("EDIT", "fecha_nacimiento", 2, '')
;
