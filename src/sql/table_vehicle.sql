
USE integrador;

-- drop

-- DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS vehiculos_tipos;

-- vehicles

CREATE TABLE IF NOT EXISTS vehiculos
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

-- Properties tipo
-- 0 string
-- 1 int
-- 2 date

CREATE TABLE IF NOT EXISTS vehiculos_tipos
(
	id       INT      AUTO_INCREMENT PRIMARY KEY,
	property CHAR(50) NULL DEFAULT NULL,
	tipo     INT      NULL DEFAULT NULL,
	defvalue CHAR(50) NULL DEFAULT NULL
);

INSERT INTO vehiculos_tipos (property, tipo, defvalue)
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


