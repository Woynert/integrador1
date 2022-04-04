
USE integrador;

-- drop

DROP TABLE IF EXISTS vehicle_price;

-- vehicles

CREATE TABLE IF NOT EXISTS vehicle_price
(
	id            INT AUTO_INCREMENT PRIMARY KEY,
	marca         CHAR(250) NOT NULL,
	id_from_marca INT NOT NULL,
	fecha         DATETIME DEFAULT CURRENT_TIMESTAMP(),
	precio        BIGINT UNSIGNED NOT NULL
);

