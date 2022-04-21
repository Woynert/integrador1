

//const dbconn = require('./conn.js')
import {dbconn} from './conn.js';

console.log(dbconn);

// start connection

let myconn = new dbconn()
myconn.start_connection()


// execute sql

var sql = "SELECT * FROM view_clients";

myconn.print_query(sql, obtener_clientes);

function obtener_clientes(rows)
{
	console.log(rows)
	console.log("Completado");
	myconn.end_connection()
}


/*var sql =
"INSERT INTO clientes (nombres,         \
                       apellidos,       \
                       domicilio,       \
                       correo,          \
                       cedula,          \
                       fecha_nacimiento,\
                       fecha_registro)  \
VALUES                    \
('Tony',                  \
 'Browny',                \
 'cll 17-25',             \
 '1004525354',            \
 'tonybrowny@mundo.com',  \
 '1998-11-13',            \
 '2022-02-11')";



myconn.print_query(sql, insertar_cliente);

function insertar_cliente(rows)
{
	console.log(rows)
	console.log("Completado");
	//myconn.end_connection()
}



*/
