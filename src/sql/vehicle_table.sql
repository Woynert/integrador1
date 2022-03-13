
USE integrador;

-- drop

DROP TABLE IF EXISTS vehicles;
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
	estado        CHAR(50) NULL DEFAULT NULL,
	fecha         DATE NULL DEFAULT NULL,
	precio        INT
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS vehicle_column_data
(
	id       INT      AUTO_INCREMENT PRIMARY KEY,
	property CHAR(50) NULL DEFAULT NULL,
	datatype INT      NULL DEFAULT NULL,
	defvalue CHAR(50) NULL DEFAULT NULL
);

INSERT INTO vehicle_column_data (property, datatype, defvalue)
VALUES
("tipo_vehiculo", 0, ''),
("marca"        , 0, ''),
("modelo"       , 0, ''),
("generacion"   , 1, ''),
("placa"        , 0, ''),
("estado"       , 1, ''),
("fecha"        , 2, ''),
("precio"       , 1, '0')
;


