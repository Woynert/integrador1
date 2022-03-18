
USE integrador;

-- drop

-- DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS vehicle_column_data;

-- vehicles

CREATE TABLE IF NOT EXISTS vehicles
(
	id            INT AUTO_INCREMENT PRIMARY KEY,
	tipo_vehiculo CHAR(50) NULL DEFAULT NULL,
	marca         CHAR(50) NULL DEFAULT NULL,
	modelo        CHAR(50) NULL DEFAULT NULL,
	generacion    CHAR(50) NULL DEFAULT NULL,
	placa         CHAR(50) NULL DEFAULT NULL,
	condicion     CHAR(50) NULL DEFAULT 'NUEVO',
	fecha         DATE NULL DEFAULT NULL,
	precio        INT,
	estado        CHAR(50) NULL DEFAULT 'DISPONIBLE'
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS vehicle_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO vehicle_column_data (property, datatype, defvalue, printname)
VALUES
("tipo_vehiculo", 0, '', "TIPO"),
("marca"        , 0, '', "MARCA"),
("modelo"       , 0, '', "MODELO"),
("generacion"   , 1, '', "GENERACION"),
("placa"        , 0, '', "PLACA"),
("condicion"    , 0, '', "CONDICION"),
("fecha"        , 2, '', "FECHA"),
("precio"       , 1, '0', "PRECIO"),
("estado"       , 0, '', "ESTADO")
;


