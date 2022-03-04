USE integrador;

-- CREATE VIEW myview AS
-- SELECT * from vehiculos;

DROP VIEW IF EXISTS view_vehiculos;


CREATE VIEW view_vehiculos AS
SELECT id AS `ID`,
        tipo_vehiculo AS `TIPO`,
        marca AS `MARCA`,
        modelo AS `MODELO`,
        generacion AS `GENERACION`,
        placa AS `PLACA`,
        estado AS `ESTADO`,
        DATE_FORMAT(fecha, '%Y/%c/%d') AS `FECHA`,
        precio AS `PRECIO`
FROM vehiculos
;

