
USE integrador;

-- drop

DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS sale_filter_search_column_data;

-- vehicles

CREATE TABLE IF NOT EXISTS sales
(
	id             INT AUTO_INCREMENT PRIMARY KEY,
	id_client      INT NOT NULL,
	id_employee    INT NOT NULL,
	id_vehicle     INT NOT NULL,
	responsible    CHAR(50) NOT NULL DEFAULT 'Consecionaria',
	state          CHAR(50) NOT NULL DEFAULT 'PENDIENTE',
	created        DATETIME DEFAULT CURRENT_TIMESTAMP(),

	subtotal       INT   NOT NULL,
	discount       INT   NOT NULL, -- perce
	tax            INT   NOT NULL, -- perce
	total          FLOAT NOT NULL,

	payed          DATETIME NULL DEFAULT NULL,
	payment_method CHAR(50) NULL DEFAULT NULL,

	FOREIGN KEY (id_client)   REFERENCES clients(id),
	FOREIGN KEY (id_employee) REFERENCES employees(id),
    FOREIGN KEY (id_vehicle)  REFERENCES vehicles(id)
);

-- Data type
-- 0 string
-- 1 int
-- 2 date

-- sale filter search column data

CREATE TABLE IF NOT EXISTS sale_filter_search_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL
	-- printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO sale_filter_search_column_data (event, property, datatype, defvalue)
VALUES
("FILTER","cedula" , 0, ''),
("FILTER","modelo" , 0, ''),
("FILTER","precio" , 1, '0'),
("FILTER","estado" , 0, ''),
("FILTER","created", 2, '')
;
