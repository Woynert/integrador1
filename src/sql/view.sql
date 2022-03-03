USE integrador;

CREATE VIEW myview AS
SELECT * from vehiculos;


/*
CREATE VIEW view_vehiculossss AS
SELECT id AS `ID`,
        tipo_vehiculo AS `TIPO`,
        marca AS `MARCA`,
        modelo AS `MODELO`,
        generacion AS `GENERACION`,
        placa AS `PLACA`,
        estado AS `ESTADO`,
        DATE_FORMAT(fecha, '%Y:%c:%d') AS `FECHA`,
        precio AS `PRECIO`
FROM vehiculos
;*/

SELECT * from vehiculos;
