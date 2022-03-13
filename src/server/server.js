
import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import {dbconn} from './database/conn.js';
import {macro} from './macro.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MARIADB CONNECTION

const myconn = new dbconn();

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


// HANDLE REQUEST

app.post ('/endpoint', function(req, res)
{


	var body = JSON.stringify(req.body);
	var id   = req.body.id;
	var data;
	var sql = '';

	console.log('body: ' + body);
	console.log(req.body.id);
	//console.log('body: ' + JSON.stringify(req.body));

	switch (id)
	{

		case macro.VEHICLE_GET_COLUMN_DATA:

			sql = "SELECT * FROM vehicle_column_data";
			break;

		case macro.VEHICLE_FILTER_SEARCH:

			data = req.body.data;

			sql = 'call vehicle_filter_search( "'
			+ data['tipo_vehiculo']
			+ '","' + data['marca']
			+ '","' + data['modelo']
			+ '","' + data['generacion']
			+ '","' + data['placa']
			+ '","' + data['estado']
			+ '","' + data['fecha_start']
			+ '","' + data['fecha_end']
			+ '","' + data['precio']
			+ '")';

			console.log(sql);

			break;

		case macro.VEHICLE_UPDATE_ROW:
			data = req.body.data;

			//console.log(data);

			sql = "CALL vehicle_update_row ( ";
			var row_id;

			for (var value in data)
			{
				console.log(data[value]);

				if (value == "ID")
					row_id = data[value];
				else
					if (value == "PRECIO")
						sql += ' ' + data[value] + ', '
					else
						sql += ' "' + data[value] + '",'
			}

			sql += row_id + ");";
			console.log(sql)

			break;

		case macro.VEHICLE_INSERT_ROW:
			data = req.body.data;

			//console.log(data);

			sql = "CALL vehicle_register ( ";

			for (var value in data)
			{
				console.log(data[value]);

				if (value == "PRECIO")
					sql += ' ' + data[value] + ','
				else
					sql += ' "' + data[value] + '",'
			}

			sql = sql.slice(0, -1);
			sql += ");";
			console.log(sql)

			break;


		case macro.CLIENT_GET_COLUMN_DATA:

			sql = "SELECT * FROM client_column_data";
			break;

		case macro.CLIENT_FILTER_SEARCH:

			data = req.body.data;

			sql = 'call client_filter_search( "'
			+ data['nombres']
			+ '","' + data['apellidos']
			+ '","' + data['domicilio']
			+ '","' + data['correo']
			+ '","' + data['cedula']
			+ '","' + data['fecha_nacimiento_start']
			+ '","' + data['fecha_nacimiento_end']
			+ '","' + data['fecha_registro_start']
			+ '","' + data['fecha_registro_end']
			+ '")';

			console.log(sql);

			break;

		default:
			console.log("WARNING: invalid id");
			return;
	}

	// start connection

	myconn.start_connection();
	myconn.print_query(sql, send_query_result, res, id);


});


function send_query_result (data, res, id)
{

	console.log("PACKAGE");

	var pack = {"id_pkg": id, "data": data};

	console.log(JSON.stringify(pack));

	res.send(pack);
	myconn.end_connection();
}
