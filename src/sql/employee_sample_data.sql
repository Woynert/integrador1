
USE integrador;

-- sample data

INSERT INTO employees (nombres,
                    apellidos,
                    domicilio,
                    cedula,
                    correo,
                    fecha_nacimiento,
                    fecha_registro,
                    role,
                    password)
VALUES
("Luigi", "Bros", "cll 17-25", "1004525354","luigi@woy.net", '1978-11-13', CURRENT_TIMESTAMP, 1, "luigi"),
("Bowser", "Firehell", "cll 50-15", "1006525354","bowser@woy.net", '1962-11-13', CURRENT_TIMESTAMP, 2, "bowser"),
("Jenny", "Walls", "crr 08-25", "1009525354","jenny@woy.net", '1998-05-15', CURRENT_TIMESTAMP, 3, "jenny"),
("Peter", "Pits", "crr 27-03", "1002525354","peter@woy.net", '2005-01-30', CURRENT_TIMESTAMP, 4, "peter")
;


