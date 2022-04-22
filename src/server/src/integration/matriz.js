
// MATRIZ SYNCRONIZATION

import axios      from 'axios';

import {macro} from '../macro.js';
import {driver_post_request,
		create_driver_post_request} from './post_request.js';

export {matriz_api};


class matriz_api{

	constructor(conn)
	{
		this.conn = conn;
		this.matriz_data = [];
		this.post_request = create_driver_post_request();
	}

	get_inventory(index)
	{
		axios
		  //.get('http://192.168.1.3:41591/inventory/'+index)
		  .get('http://127.0.0.1:3001/inventory/'+index)
		  .then(res =>
		  {

			    console.log(`statusCode: ${res.status}`);
			    console.log(res.data["body"]);
			    console.log(res.data["body"] != null);

				if (res.data["body"] != null){
			    //if (res.data.body.length){
				    console.log(res.data.body.length);

					let data = res.data.body;

			    	for (var i = 0; i < data.length; i++)
			    	{
			    		//console.log(data[i]);
			    		this.matriz_data.push(data[i]);
			    	}

				    this.get_inventory(index+1);
				}

				// finished
				else{
					console.log("start sync");
					this.sync_to_database(this.conn);
				}

		  })
		  .catch(error => {
		    //console.error(error);
		    console.log("Error matriz_get_inventory");
		    console.log(error.code);
		  })
		;
	}

	sync_to_database(conn)
	{

		var item;

		conn.start_connection();

		console.log("A")

		for (var i = 0; i < this.matriz_data.length; i++){


			item = this.matriz_data[i];
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

			let lastone = (i == this.matriz_data.length-1);

			console.log(sql);

			conn.print_query(sql,
			function (data, res, id)
			{
				console.log("COMPLETED");

				var pack = {"id_pkg": id, "data": data};

				console.log(JSON.stringify(pack));

				if (lastone)
					conn.end_connection();
			}
			, 0, 0);

		}

		//intern_conn.end_connection();
	}

	request_local_users(module)
	{

        // "call client_filter_search('','','','','','','0001-01-01','9999-01-01','0001-01-01','9999-01-01',-1);"

		var data = []
		data['nombres'] = '';
        data['apellidos'] = '';
        data['cedula'] = '';
        data['domicilio'] = '';
        data['telefono'] = '';
        data['correo'] = '';
        data['fecha_nacimiento_start'] = '0001-01-01';
        data['fecha_nacimiento_end'] = '9999-01-01';
        data['fecha_registro_start'] = '0001-01-01';
        data['fecha_registro_end'] = '9999-01-01';
        data['page_number'] = -1;

		// create object
        var postObj = {
            id: macro.CLIENT_FILTER_SEARCH,
            data: data
        };

		module.post_request.request(postObj,
			function(rows)
			{
				// show search result

				if (!rows.data){
					return;
				}

				console.log(rows.data);
			}
		);
	}

	static report_sale(module, data)
	{

		var valuelist = {
			"id_vehiculo"  : data.id_vehiculo,
			"precio_venta" : data.precio_venta,
			"fecha_venta"  : data.fecha_venta
		}

		/*
		var valuelist = {
			"id_vehiculo"  : 1,
			"precio_venta" : 20000,
			"fecha_venta"  : "2000/03/17"
		}*/


		console.log(valuelist);

		// create object
        var postObj = {
            id: macro.CLIENT_FILTER_SEARCH,
            data: valuelist
        };

		module.post_request.request(postObj,
			function(rows)
			{
				// show search result

				if (!rows.data){
					return;
				}

				console.log("API RETURNED");
				console.log(rows.data);
			}
		);

		return;
	}
}



/*setTimeout(function(){
	get_inventory(1);
}, 1000);*/
//get_inventory(1);
