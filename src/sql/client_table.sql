
USE integrador;

-- drop

DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS client_column_data;

-- create

CREATE TABLE IF NOT EXISTS clients
(
    id               INT       AUTO_INCREMENT PRIMARY KEY,
    nombres          CHAR(250) NULL DEFAULT NULL,
    apellidos        CHAR(250) NULL DEFAULT NULL,
    cedula           CHAR(50)  NULL DEFAULT NULL,
    domicilio        CHAR(50)  NULL DEFAULT NULL,
    telefono         CHAR(50)  NULL DEFAULT NULL,
    correo           CHAR(250) NULL DEFAULT NULL,
    fecha_nacimiento DATE NULL DEFAULT NULL,
    fecha_registro   DATETIME DEFAULT CURRENT_TIMESTAMP(),

    UNIQUE KEY (cedula),
    UNIQUE KEY (correo)
);

-- Data type
-- 0 string
-- 1 int
-- 2 date
-- 3 password
-- 4 selection string
-- 5 selection string -> number

CREATE TABLE IF NOT EXISTS client_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	options   CHAR(250) NULL DEFAULT NULL,
	editable  BOOLEAN   DEFAULT FALSE
);

INSERT INTO client_column_data (event, property, datatype, defvalue, options, editable)
VALUES
("FILTER", "nombres"         , 0, '', '{}', TRUE),
("FILTER", "apellidos"       , 0, '', '{}', TRUE),
("FILTER", "cedula"          , 0, '', '{}', TRUE),
("FILTER", "domicilio"       , 0, '', '{}', TRUE),
("FILTER", "telefono"        , 0, '', '{}', TRUE),
("FILTER", "correo"          , 0, '', '{}', TRUE),
("FILTER", "fecha_nacimiento", 2, '', '{}', TRUE),
("FILTER", "fecha_registro"  , 2, '', '{}', TRUE),

("EDIT", "id"              , 0, '', '{}', FALSE),
("EDIT", "nombres"         , 0, '', '{}', TRUE),
("EDIT", "apellidos"       , 0, '', '{}', TRUE),
("EDIT", "cedula"          , 0, '', '{}', TRUE),
("EDIT", "domicilio"       , 0, '', '{}', TRUE),
("EDIT", "telefono"        , 0, '', '{}', TRUE),
("EDIT", "correo"          , 0, '', '{}', TRUE),
("EDIT", "fecha_nacimiento", 2, '', '{}', TRUE),

("REG", "nombres"         , 0, '', '{}', TRUE),
("REG", "apellidos"       , 0, '', '{}', TRUE),
("REG", "cedula"          , 0, '', '{}', TRUE),
("REG", "domicilio"       , 0, '', '{}', TRUE),
("REG", "telefono"        , 0, '', '{}', TRUE),
("REG", "correo"          , 0, '', '{}', TRUE),
("REG", "fecha_nacimiento", 2, '', '{}', TRUE)
;
