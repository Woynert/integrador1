
USE integrador;

-- drop

DROP TABLE IF EXISTS sales_pending;
DROP TABLE IF EXISTS sale_filter_search_column_data;

-- vehicles

CREATE TABLE IF NOT EXISTS sales_pending
(
	id             INT AUTO_INCREMENT PRIMARY KEY,
	id_client      INT NOT NULL,
	id_vehicle     INT NOT NULL,
	state          CHAR(50) NOT NULL DEFAULT 'PENDIENTE',
	created        DATETIME DEFAULT CURRENT_TIMESTAMP(),
	payed          DATETIME NULL DEFAULT NULL,
	payment_method CHAR(50) NULL DEFAULT NULL,

	FOREIGN KEY (id_client) REFERENCES clients(id),
    FOREIGN KEY (id_vehicle) REFERENCES vehicles(id)
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

-- sale filter search column data

CREATE TABLE IF NOT EXISTS sale_filter_search_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO sale_filter_search_column_data (property, datatype, defvalue, printname)
VALUES
("cedula" , 0, '', "CEDULA"),
("modelo" , 0, '', "MODELO"),
("precio" , 1, '0', "PRECIO"),
("estado" , 0, '', "ESTADO"),
("created", 2, '', "CREATED")
;
