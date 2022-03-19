
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
    fecha_registro       DATETIME NULL DEFAULT NULL,
    role                 INT,
    password             CHAR(250) NULL DEFAULT NULL
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS employee_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO employee_column_data (property, datatype, defvalue, printname)
VALUES
("nombres"         , 0, '', "NOMBRES"),
("apellidos"       , 0, '', "APELLIDOS"),
("domicilio"       , 0, '', "DOMICILIO"),
("cedula"          , 0, '', "CEDULA"),
("correo"          , 0, '', "CORREO"),
("fecha_nacimiento", 2, '', "NACIMIENTO"),
("fecha_registro"  , 2, '', "REGISTRO"),
("role"            , 1, '0', "ROLE")
;
