
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
    fecha_registro       DATE NULL DEFAULT NULL
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS client_column_data
(
	id       INT      AUTO_INCREMENT PRIMARY KEY,
	property CHAR(50) NULL DEFAULT NULL,
	datatype INT      NULL DEFAULT NULL,
	defvalue CHAR(50) NULL DEFAULT NULL
);

INSERT INTO client_column_data (property, datatype, defvalue)
VALUES
("nombres"         , 0, ''),
("apellidos"       , 0, ''),
("domicilio"       , 0, ''),
("correo"          , 0, ''),
("cedula"          , 0, ''),
("fecha_nacimiento", 2, ''),
("fecha_registro"  , 2, '')
;
