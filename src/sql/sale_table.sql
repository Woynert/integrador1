
USE integrador;

-- drop

DROP TABLE IF EXISTS sales_pending;

-- vehicles

CREATE TABLE IF NOT EXISTS sales_pending
(
	id            INT AUTO_INCREMENT PRIMARY KEY,
	id_client     INT NOT NULL,
	id_vehicle    INT NOT NULL,
	created       TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

	FOREIGN KEY (id_client) REFERENCES clients(id),
    FOREIGN KEY (id_vehicle) REFERENCES vehicles(id)
);
