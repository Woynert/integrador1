
USE integrador;

-- drop

DROP TABLE IF EXISTS vehiculos;

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
