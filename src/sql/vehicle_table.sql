
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
	id_from_marca INT UNSIGNED NULL,
	modelo        CHAR(50) NULL DEFAULT NULL,
	generacion    CHAR(50) NULL DEFAULT NULL,
	condicion     CHAR(50) NULL DEFAULT 'NUEVO',
	fecha         DATETIME DEFAULT CURRENT_TIMESTAMP(),
	precio        BIGINT UNSIGNED,
	cantidad      INT UNSIGNED NOT NULL DEFAULT 1,
	estado        CHAR(50) NULL DEFAULT 'DISPONIBLE',

	UNIQUE INDEX (marca, id_from_marca)
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
	options   CHAR(250) NULL DEFAULT NULL,
	editable  BOOLEAN   DEFAULT FALSE
);

INSERT INTO vehicle_column_data (event, property, datatype, defvalue, options, editable)
VALUES
("FILTER", "marca"        , 0, '', '{}', TRUE),
("FILTER", "tipo_vehiculo", 0, '', '{}', TRUE),
("FILTER", "modelo"       , 0, '', '{}', TRUE),
("FILTER", "generacion"   , 1, '', '{}', TRUE),
("FILTER", "condicion"    , 4, '', '{"NUEVO":0,"USADO":1}', TRUE),
("FILTER", "fecha"        , 2, '', '{}', TRUE),
("FILTER", "precio"       , 1, '0', '{}', TRUE),
("FILTER", "estado"       , 4, '', '{"DISPONIBLE":0,"EN TRAMITE":1,"VENDIDO":2}', TRUE),

("EDIT", "marca"        , 0, '', '{}', FALSE),
("EDIT", "id_from_marca", 0, '', '{}', FALSE),
("EDIT", "tipo_vehiculo", 0, '', '{}', TRUE),
("EDIT", "modelo"       , 0, '', '{}', TRUE),
("EDIT", "generacion"   , 1, '', '{}', TRUE),
("EDIT", "condicion"    , 4, '', '{"NUEVO":0,"USADO":1}', TRUE),
("EDIT", "precio"       , 1, '0', '{}', TRUE),
("EDIT", "cantidad"     , 1, '1', '{}', TRUE),

("REG", "tipo_vehiculo", 0, '', '{}', TRUE),
("REG", "modelo"       , 0, '', '{}', TRUE),
("REG", "generacion"   , 1, '', '{}', TRUE),
("REG", "condicion"    , 4, '', '{"NUEVO":0,"USADO":1}', TRUE),
("REG", "precio"       , 1, '0', '{}', TRUE),
("REG", "cantidad"     , 1, '1', '{}', TRUE)
;


