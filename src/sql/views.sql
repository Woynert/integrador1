USE integrador;


DROP VIEW IF EXISTS view_vehicles;
DROP VIEW IF EXISTS view_clients;


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
