
import axios      from 'axios';
import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import {dbconn} from './database/conn.js';
import {macro} from './macro.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MARIADB CONNECTION

const intern_conn = new dbconn();
const myconn      = new dbconn();

// SERVER SETUP

const app  = express();
const port = process.env.PORT || 3000;

// Setting path for public directory

const static_path = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server Setup

app.listen(port, () => {
   console.log(`server is running at ${port}`);
});


BigInt.prototype.toJSON = function() { return this.toString() };


// MATRIZ SYNCRONIZATION

var matriz_data = [];

function matriz_get_inventory(index)
{
	axios
	  .get('http://127.0.0.1:3001/product/'+index)
	  .then(res =>
	  {

		    console.log(`statusCode: ${res.status}`);
		    console.log(res.data.body.length);

			// continue
		    if (res.data.body.length){

				let data = res.data.body;

		    	for (var i = 0; i < data.length; i++)
		    	{
		    		//console.log(data[i]);
		    		matriz_data.push(data[i]);
		    	}

			    matriz_get_inventory(index+1);
			}

			// finished
			else{
				matriz_sync();
			}

	  })
	  .catch(error => {
	    //console.error(error);
	    console.log("Error matriz_get_inventory");
	    console.log(error.code);
	  })
	;
}

function matriz_sync()
{

	//var sql = "";
	var item;

	intern_conn.start_connection();

	for (var i = 0; i < matriz_data.length; i++){


		item = matriz_data[i];
		//console.log(matriz_data[i]);

		let
		sql = 'CALL vehicle_update_or_register( "'
			+         "upbmotors"
			+ '", ' + item.id
			+ ' ,"' + "carro"
			+ '","' + item.nombre
			+ '","' + "2022"
			+ '","' + "NUEVO"
			+ '", ' + item.precio
			+ ' , ' + item.cantidad
			+ ')';

		let lastone = (i == matriz_data.length-1);

		console.log(sql);

		intern_conn.print_query(sql,
		function (data, res, id)
		{
			console.log("COMPLETED");

			var pack = {"id_pkg": id, "data": data};

			console.log(JSON.stringify(pack));

			if (lastone)
				intern_conn.end_connection();
		}
		, 0, 0);

	}

	//intern_conn.end_connection();

}

setTimeout(function(){
matriz_get_inventory(1);
}, 1000);
//matriz_get_inventory(1);

// HANDLE REQUEST

app.post ('/endpoint', function(req, res)
{

	var body = JSON.stringify(req.body);
	var id   = req.body.id;
	var data = req.body.data;
	var sql = '';

	switch (id)
	{

		case macro.LOGIN:
			sql = "call login('" + data.user + "','" + data.password + "');"
			break;

		case macro.VEHICLE_GET_COLUMN_DATA:

			sql = "SELECT * FROM vehicle_column_data";
			break;

		case macro.VEHICLE_FILTER_SEARCH:

			sql = 'call vehicle_filter_search( "'
			+         data['marca']
			+ '","' + data['tipo_vehiculo']
			+ '","' + data['modelo']
			+ '","' + data['generacion']
			// + '","' + data['placa']
			+ '","' + data['condicion']
			+ '","' + data['fecha_start']
			+ '","' + data['fecha_end']
			+ '","' + data['precio']
			+ '","' + data['estado']
			+ '",' + data['page_number']
			+ ')';

			break;

		case macro.VEHICLE_UPDATE_ROW:

			sql = "CALL vehicle_update_row ( ";

			for (var value in data)
			{
				//console.log(data[value]);

				// null check
				if (data[value] == null)
				{
					sql += ' null,';
					continue;
				}

				if ((value == "precio") || (value == "id_from_marca"))
					sql += ' ' + data[value] + ',';
				else
					sql += ' "' + data[value] + '",';
			}

			sql = sql.slice(0, -1);
			sql += ");";

			break;

		case macro.VEHICLE_INSERT_ROW:

			sql = "CALL vehicle_register ( ";
			sql += "'consbin', 0,";

			for (var value in data)
			{
				//console.log(data[value]);

				if (value == "precio")
					sql += ' ' + data[value] + ','
				else
					sql += ' "' + data[value] + '",'
			}

			sql = sql.slice(0, -1);
			sql += ");";

			break;

		case macro.VEHICLE_PRICE_SEARCH:
			sql = "CALL vehicle_price_search ('"
			+         data.marca
			+ "'," + data.id_from_marca
			+ ");";
			break;

		case macro.CLIENT_GET_COLUMN_DATA:

			sql = "SELECT * FROM client_column_data";
			break;

		case macro.CLIENT_FILTER_SEARCH:

			sql = 'call client_filter_search( "'
			+ data['nombres']
			+ '","' + data['apellidos']
			+ '","' + data['cedula']
			+ '","' + data['domicilio']
			+ '","' + data['telefono']
			+ '","' + data['correo']
			+ '","' + data['fecha_nacimiento_start']
			+ '","' + data['fecha_nacimiento_end']
			+ '","' + data['fecha_registro_start']
			+ '","' + data['fecha_registro_end']
			+ '",' + data['page_number']
			+ ')';

			break;

		case macro.CLIENT_UPDATE_ROW:

			sql = "CALL client_update_row ( ";
			var row_id;

			for (var value in data)
			{

				// null check
				if (data[value] == null)
				{
					sql += ' null, ';
					continue;
				}

				if (value == "id")
					row_id = data[value];
				else
					sql += ' "' + data[value] + '",';
			}

			sql += row_id + ");";

			break;


		case macro.CLIENT_INSERT_ROW:

			sql = "CALL client_register ( ";

			for (var value in data)
			{
				sql += ' "' + data[value] + '",'
			}

			sql = sql.slice(0, -1);
			sql += ");";

			break;

		case macro.SALES_PENDING_NEW:

			sql = "CALL sales_pending_new ( " +
				data.id_client     + ", "+
				data.id_employee   + ", '"+
				data.marca         + "', "+
				data.id_from_marca + ", '"+
				data.responsible   + "', "+
				data.discount      + ");";

			break;

		case macro.SALES_PENDING_DELETE:

			sql = "CALL sales_pending_delete (" + data.id + ");";

			break;

		case macro.SALE_GET_COLUMN_DATA:

			sql = "SELECT * FROM sale_filter_search_column_data";
			break;

		case macro.SALE_FILTER_SEARCH:

			//console.log(data);

			sql = 'call sale_filter_search( "'
			+         data['cedula']
			+ '","' + data['modelo']
			+ '",'  + data['precio']
			+ ',"'  + data['estado']
			+ '","' + data['created_start']
			+ '","' + data['created_end']
			+ '",' + data['page_number']
			+ ')';

			break;

		case macro.SALE_CONFIRM_PAYMENT:
			sql = "call sale_confirm_payment (" +
				data.id_sale + ", '" +
				data.payment_method + "');"
			break;

		case macro.SALE_CANCEL_PAYMENT:
			sql = "call sale_cancel_payment (" +data.id_sale+ ");"
			break;

		case macro.EMPLOYEE_GET_COLUMN_DATA:

			sql = "SELECT * FROM employee_column_data";
			break;

		case macro.EMPLOYEE_FILTER_SEARCH:

			sql = 'call employee_filter_search( "'
			+ data['nombres']
			+ '","' + data['apellidos']
			+ '","' + data['domicilio']
			+ '","' + data['cedula']
			+ '","' + data['correo']
			+ '","' + data['fecha_nacimiento_start']
			+ '","' + data['fecha_nacimiento_end']
			+ '","' + data['fecha_registro_start']
			+ '","' + data['fecha_registro_end']
			+ '","' + data['role']
			+ '", ' + data['page_number']
			+ ')';

			break;

		case macro.EMPLOYEE_UPDATE_ROW:

			sql = "CALL employee_update_row ( ";
			var row_id;

			for (var value in data)
			{

				// null check
				if (data[value] == null)
				{
					sql += ' null, ';
					continue;
				}

				if (value == "id")
					row_id = data[value];
				else
					sql += ' "' + data[value] + '",';
			}

			sql += row_id + ");";

			break;


		case macro.EMPLOYEE_INSERT_ROW:

			sql = "CALL employee_register ( ";

			for (var value in data)
			{
				sql += ' "' + data[value] + '",'
			}

			sql = sql.slice(0, -1);
			sql += ");";

			break;

		case macro.SALE_GET_FACTURE_INFO:
			sql = "CALL sale_get_facture_info("+data.id_sale+")";
			break;

		default:
			console.log("WARNING: invalid request id");
			return;
	}

	console.log('\n');
	console.log(req.body.id);
	console.log(sql);
	console.log('body: ' + body);

	// start connection

	myconn.start_connection();
	myconn.print_query(sql, send_query_result, res, id);


});


function send_query_result (data, res, id)
{

	console.log("COMPLETED");

	var pack = {"id_pkg": id, "data": data};

	//console.log(JSON.stringify(pack));

	res.send(pack);
	myconn.end_connection();
}
