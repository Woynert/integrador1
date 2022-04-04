
USE integrador;

-- drop

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employee_column_data;

-- create

CREATE TABLE IF NOT EXISTS employees
(
    id                   INT       AUTO_INCREMENT PRIMARY KEY,
    nombres              CHAR(250) NULL DEFAULT NULL,
    apellidos            CHAR(250) NULL DEFAULT NULL,
    domicilio            CHAR(250) NULL DEFAULT NULL,
    cedula               CHAR(250) NOT NULL,
    correo               CHAR(250) NOT NULL,
    fecha_nacimiento     DATE NULL DEFAULT NULL,
	fecha_registro       DATETIME DEFAULT CURRENT_TIMESTAMP(),
    role                 INT,
    password             CHAR(250) NULL DEFAULT NULL,

    UNIQUE KEY (cedula),
    UNIQUE KEY (correo)
);

-- Rols
-- 0 null
-- 1 admin
-- 2 acesor comercial
-- 3 cajero

-- Data type
-- 0 string
-- 1 int
-- 2 date
-- 3 password
-- 4 selection string
-- 5 selection string -> number

CREATE TABLE IF NOT EXISTS employee_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	options   CHAR(250) NULL DEFAULT NULL,
	editable  BOOLEAN   DEFAULT FALSE
);

INSERT INTO employee_column_data (event, property, datatype, defvalue, options, editable)
VALUES
("FILTER", "nombres"         , 0, '', '{}', TRUE),
("FILTER", "apellidos"       , 0, '', '{}', TRUE),
("FILTER", "domicilio"       , 0, '', '{}', TRUE),
("FILTER", "cedula"          , 0, '', '{}', TRUE),
("FILTER", "correo"          , 0, '', '{}', TRUE),
("FILTER", "fecha_nacimiento", 2, '', '{}', TRUE),
("FILTER", "fecha_registro"  , 2, '', '{}', TRUE),
("FILTER", "role"            , 5, '0', '{"ADMINISTRADOR":1,"ASESOR COMERCIAL":2,"CAJERO":3}', TRUE),

("EDIT", "id"              , 0, '', '{}', FALSE),
("EDIT", "nombres"         , 0, '', '{}', TRUE), -- edit doesn't need defvalue
("EDIT", "apellidos"       , 0, '', '{}', TRUE),
("EDIT", "domicilio"       , 0, '', '{}', TRUE),
("EDIT", "cedula"          , 0, '', '{}', TRUE),
("EDIT", "correo"          , 0, '', '{}', TRUE),
("EDIT", "fecha_nacimiento", 2, '', '{}', TRUE),
("EDIT", "role"            , 5, '', '{"ADMINISTRADOR":1,"ASESOR COMERCIAL":2,"CAJERO":3}', TRUE),
("EDIT", "password"        , 3, '', '{}', TRUE),

("REG", "nombres"         , 0, '', '{}', TRUE),
("REG", "apellidos"       , 0, '', '{}', TRUE),
("REG", "domicilio"       , 0, '', '{}', TRUE),
("REG", "cedula"          , 0, '', '{}', TRUE),
("REG", "correo"          , 0, '', '{}', TRUE),
("REG", "fecha_nacimiento", 2, '', '{}', TRUE),
("REG", "role"            , 5, '', '{"ADMINISTRADOR":1,"ASESOR COMERCIAL":2,"CAJERO":3}', TRUE),
("REG", "password"        , 3, '', '{}', TRUE)
;
