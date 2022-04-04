USE integrador;


DROP VIEW IF EXISTS view_vehicles;
DROP VIEW IF EXISTS view_clients;
DROP VIEW IF EXISTS view_sales;

-- vehicles

CREATE VIEW view_vehicles AS
SELECT id AS `ID`,
        marca,
        id_from_marca,
        tipo_vehiculo,
        modelo,
        generacion,
        condicion,
        DATE_FORMAT(fecha, '%Y-%m-%d') AS `fecha`,
        precio,
        cantidad,
        estado
FROM vehicles
;

-- clients

CREATE VIEW view_clients AS
SELECT id AS `ID`,
        nombres,
        apellidos,
        domicilio,
        cedula,
        correo,
        DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS `fecha_nacimiento`,
        DATE_FORMAT(fecha_registro, '%Y-%m-%d') AS `fecha_registro`
FROM clients
;

-- sales

CREATE VIEW view_sales AS
SELECT id AS `ID`,

	id_client      `idCl`,
	id_employee    `idEm`,
	marca          ,
	id_from_marca  `idFM` ,
	responsible    `resp`,
	state          ,
	DATE_FORMAT(created, '%m-%d %H:%i') AS `created`,

	subtotal       ,
	discount       `disc`,
	tax            ,
	total          ,

	DATE_FORMAT(payed, '%m-%d %H:%i') AS `payed`,
	payment_method `pay_met`

FROM sales
;
