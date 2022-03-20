
-- start

DROP DATABASE integrador;
CREATE DATABASE integrador;
USE integrador;

-- scripts

SOURCE ./vehicle_table.sql;
SOURCE ./client_table.sql;
SOURCE ./sale_table.sql;
SOURCE ./employee_table.sql;

SOURCE ./views.sql;

SOURCE ./client_procedure.sql;
SOURCE ./vehicle_procedure.sql;
SOURCE ./sale_procedure.sql;
SOURCE ./employee_procedure.sql;

SOURCE ./vehicle_sample_data.sql;
SOURCE ./client_sample_data.sql;
SOURCE ./employee_sample_data.sql;
SOURCE ./sale_sample_data.sql;
