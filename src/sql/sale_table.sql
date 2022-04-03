
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
	marca          CHAR(250) NOT NULL,
	id_from_marca  INT NOT NULL,
	responsible    CHAR(50) NOT NULL DEFAULT 'Consecionaria',
	state          CHAR(50) NOT NULL DEFAULT 'PENDIENTE',
	created        DATETIME DEFAULT CURRENT_TIMESTAMP(),

	subtotal       BIGINT UNSIGNED  NOT NULL,
	discount       INT   NOT NULL, -- perce
	tax            INT   NOT NULL, -- perce
	total          BIGINT UNSIGNED NOT NULL,

	payed          DATETIME NULL DEFAULT NULL,
	payment_method CHAR(50) NULL DEFAULT NULL,

	FOREIGN KEY (id_client)   REFERENCES clients(id),
	FOREIGN KEY (id_employee) REFERENCES employees(id)

	-- FOREIGN KEY ( marca, id_from_marca )
	-- REFERENCES vehicles ( marca, id_from_marca )
);

-- Data type
-- 0 string
-- 1 int
-- 2 date
-- 3 password
-- 4 selection string
-- 5 selection string -> number

-- sale filter search column data

CREATE TABLE IF NOT EXISTS sale_filter_search_column_data
(
	id        INT      AUTO_INCREMENT PRIMARY KEY,
	event     CHAR(40) NULL DEFAULT NULL,
	property  CHAR(50) NULL DEFAULT NULL,
	datatype  INT      NULL DEFAULT NULL,
	defvalue  CHAR(50) NULL DEFAULT NULL,
	options   CHAR(250) NULL DEFAULT NULL
	-- printname CHAR(50) NULL DEFAULT NULL
);

INSERT INTO sale_filter_search_column_data (event, property, datatype, defvalue, options)
VALUES
("FILTER","cedula" , 0, '', '{}'),
("FILTER","modelo" , 0, '', '{}'),
("FILTER","precio" , 1, '0', '{}'),
("FILTER","estado" , 4, '', '{"PENDIENTE":0,"PAGADO":1,"CANCELADO":2}'),
("FILTER","created", 2, '', '{}')
;
