USE integrador;


DROP VIEW IF EXISTS view_vehicles;
DROP VIEW IF EXISTS view_clients;


CREATE VIEW view_vehicles AS
SELECT id AS `ID`,
        tipo_vehiculo AS `TIPO`,
        marca AS `MARCA`,
        modelo AS `MODELO`,
        generacion AS `GENERACION`,
        placa AS `PLACA`,
        condicion AS `CONDICION`,
        DATE_FORMAT(fecha, '%Y-%m-%d') AS `FECHA`,
        precio AS `PRECIO`,
        estado AS `ESTADO`
FROM vehicles
;

CREATE VIEW view_clients AS
SELECT id AS `ID`,
        nombres AS `NOMBRES`,
        apellidos AS `APELLIDOS`,
        domicilio AS `DOMICILIO`,
        cedula AS `CEDULA`,
        correo AS `CORREO`,
        DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS `NACIMIENTO`,
        DATE_FORMAT(fecha_registro, '%Y-%m-%d') AS `REGISTRO`
FROM clients
;
