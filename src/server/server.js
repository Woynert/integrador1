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



// HANDLE REQUEST

app.post ('/endpoint', function(req, res)
{
	var body = JSON.stringify(req.body);
	var id   = req.body.id
	var sql;

	console.log('body: ' + body);
	console.log(req.body.id);
	//console.log('body: ' + JSON.stringify(req.body));

	switch (id)
	{
		case 1:
			sql = "SELECT * FROM vehiculos";
			break;

		case 2:
			sql = "SELECT * FROM clientes";
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
	var package = {"id_pkg": id, "data": data};

	res.send(package);
	myconn.end_connection();
}
