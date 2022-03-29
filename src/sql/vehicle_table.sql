
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
	fecha         DATETIME DEFAULT CURRENT_TIMESTAMP(),
	precio        BIGINT UNSIGNED,
	estado        CHAR(50) NULL DEFAULT 'DISPONIBLE'
);

-- Data type
-- 0 string
-- 1 int
-- 2 date
-- 3 password
-- 4 selection string
-- 5 selection string -> number

CREATE TABLE IF NOT EXISTS vehicle_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	options   CHAR(250) NULL DEFAULT NULL
	-- printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO vehicle_column_data (event, property, datatype, defvalue, options)
VALUES
("FILTER", "tipo_vehiculo", 0, '', '{}'),
("FILTER", "marca"        , 0, '', '{}'),
("FILTER", "modelo"       , 0, '', '{}'),
("FILTER", "generacion"   , 1, '', '{}'),
("FILTER", "placa"        , 0, '', '{}'),
("FILTER", "condicion"    , 4, '', '{"NUEVO":0,"USADO":1}'),
("FILTER", "fecha"        , 2, '', '{}'),
("FILTER", "precio"       , 1, '0', '{}'),
("FILTER", "estado"       , 4, '', '{"DISPONIBLE":0,"EN TRAMITE":1,"VENDIDO":2}'),
("EDIT", "tipo_vehiculo", 0, '', '{}'),
("EDIT", "marca"        , 0, '', '{}'),
("EDIT", "modelo"       , 0, '', '{}'),
("EDIT", "generacion"   , 1, '', '{}'),
("EDIT", "placa"        , 0, '', '{}'),
("EDIT", "condicion"    , 4, '', '{"NUEVO":0,"USADO":1}'),
("EDIT", "precio"       , 1, '0', '{}')
;


