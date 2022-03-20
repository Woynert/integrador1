USE integrador;


DROP VIEW IF EXISTS view_vehicles;
DROP VIEW IF EXISTS view_clients;


CREATE VIEW view_vehicles AS
SELECT id AS `ID`,
        tipo_vehiculo,
        marca,
        modelo,
        generacion,
        placa,
        condicion,
        DATE_FORMAT(fecha, '%Y-%m-%d') AS `fecha`,
        precio,
        estado
FROM vehicles
;

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
