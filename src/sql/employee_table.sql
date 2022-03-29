
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
    cedula               CHAR(250) NULL DEFAULT NULL,
    correo               CHAR(250) NULL DEFAULT NULL,
    fecha_nacimiento     DATE NULL DEFAULT NULL,
	fecha_registro       DATETIME DEFAULT CURRENT_TIMESTAMP(),
    role                 INT,
    password             CHAR(250) NULL DEFAULT NULL
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
	options   CHAR(250) NULL DEFAULT NULL
	-- printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO employee_column_data (event, property, datatype, defvalue, options)
VALUES
("FILTER", "nombres"         , 0, '', '{}'),
("FILTER", "apellidos"       , 0, '', '{}'),
("FILTER", "domicilio"       , 0, '', '{}'),
("FILTER", "cedula"          , 0, '', '{}'),
("FILTER", "correo"          , 0, '', '{}'),
("FILTER", "fecha_nacimiento", 2, '', '{}'),
("FILTER", "fecha_registro"  , 2, '', '{}'),
("FILTER", "role"            , 5, '0', '{"ADMINISTRADOR":1,"ASESOR COMERCIAL":2,"CAJERO":3}'),
("EDIT", "nombres"         , 0, '', '{}'), -- edit does not need defvalue
("EDIT", "apellidos"       , 0, '', '{}'),
("EDIT", "domicilio"       , 0, '', '{}'),
("EDIT", "cedula"          , 0, '', '{}'),
("EDIT", "correo"          , 0, '', '{}'),
("EDIT", "fecha_nacimiento", 2, '', '{}'),
("EDIT", "role"            , 5, '', '{"ADMINISTRADOR":1,"ASESOR COMERCIAL":2,"CAJERO":3}'),
("EDIT", "password"        , 3, '', '{}')
;
