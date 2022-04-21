
import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import {macro} from './macro.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SERVER SETUP

const app  = express();
const port = process.env.PORT || 3001;

// Setting path for public directory

const static_path = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server Setup

app.listen(port, () => {
   console.log(`server is running at ${port}`);
});


BigInt.prototype.toJSON = function() { return this.toString() };


// test

app.get("/inventory/1",function(request,response)
{
	var text = `
{"succeed":true,"message":"","body":[
{"id":1,"cantidad":105,"nombre":"sedan","descripcion":"Mazda","precio":6015102,"activo":false,"dependencia":"giron","imagen":null},
{"id":2,"cantidad":125,"nombre":"deportivo","descripcion":"Mazda","precio":1515102,"activo":false,"dependencia":"fgiron","imagen":null},
{"id":3,"cantidad":205,"nombre":"van","descripcion":"Mazda","precio":1015102,"activo":true,"dependencia":"girghfon","imagen":null},
{"id":4,"cantidad":1105,"nombre":"camionet","descripcion":"Mazda","precio":3015102,"activo":false,"dependencia":"gdasdiron","imagen":null},
{"id":5,"cantidad":112,"nombre":"moto","descripcion":"Mazda","precio":2015102,"activo":true,"dependencia":"csadasn","imagen":null}
]}
	`;

    response.json(JSON.parse(text));
});

app.get("/inventory/2",function(request,response)
{
	var text = `
{"succeed":true,"message":"","body":[
{"id":6,"cantidad":105,"nombre":"sdan","descripcion":"Mazda","precio":6015102,"activo":false,"dependencia":"giron","imagen":null},
{"id":7,"cantidad":125,"nombre":"dportivo","descripcion":"Mazda","precio":1515102,"activo":false,"dependencia":"fgiron","imagen":null},
{"id":8,"cantidad":205,"nombre":"vn","descripcion":"Mazda","precio":1015102,"activo":true,"dependencia":"girghfon","imagen":null}
]}
	`;

    response.json(JSON.parse(text));
});

app.get("/inventory/3",function(request,response)
{
	var text = `
{"succeed":true,"message":"","body":null}
	`;

	/*var text = `
{"succeed":true,"message":"","body":[]}
	`;*/

    response.json(JSON.parse(text));
});

