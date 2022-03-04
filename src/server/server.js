const express    = require('express');
const path       = require('path')
const bodyParser = require('body-parser');

const dbconn     = require('./database/conn.js');

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
		case 1:
			sql = "SELECT * FROM view_vehiculos";
			break;

		case 2:
			data = req.body.data;

			//console.log(data);

			sql = "CALL update_vehicle_row ( ";
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
						sql += ' "' + data[value] + '", '
			}

			sql += row_id + ");";
			console.log(sql)

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

	var package = {"id_pkg": id, "data": data};

	console.log(JSON.stringify(package));

	res.send(package);
	myconn.end_connection();
}
