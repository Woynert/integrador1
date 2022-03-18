
import {macro} from '../macro.js';
import {show_message} from '../index.js';
import {driver_module_search} from '../search/driver.js';

export {create_module_sale};

class module_sale
{
	constructor()
	{

		// transaccional
		this.id_selected_vehicle = null;
		this.id_selected_client = null;

		// elements
		this.btn_invoke_vehicle;
		this.btn_invoke_client;
		this.btn_send;

		this.lbl_selected_vehicle;
		this.lbl_selected_client;

		// shared modules
		this.mod_search_vehicle;
		this.mod_search_client;
		this.dialog_picker;
        this.post_request;
	}

	init ()
	{
		// get elements
		this.btn_invoke_vehicle = document.getElementById("sale_btn_invoke_vehicle");
		this.btn_invoke_client = document.getElementById("sale_btn_invoke_client");
		this.btn_send = document.getElementById("sale_btn_send");

		this.lbl_selected_vehicle = document.getElementById("sale_lbl_selected_vehicle");
		this.lbl_selected_client = document.getElementById("sale_lbl_selected_client");

		this.reset();
	}

	set_post_request (post_request){
        this.post_request = post_request;
    }

    set_mod_search_vehicle(mod_vehicle){
        this.mod_search_vehicle = mod_vehicle;
    }

    set_mod_search_client(mod_client){
        this.mod_search_client = mod_client;
    }

    set_dialog_picker(dialog_picker){
    	this.dialog_picker = dialog_picker
    }

    reset ()
    {
    	this.id_selected_vehicle = null;
		this.id_selected_client = null;

		this.lbl_selected_vehicle.innerHTML = "Ningún vehiculo seleccionado";
		this.lbl_selected_client.innerHTML = "Ningún cliente seleccionado";
    }

	static callback_select_vehicle (module, data)
	{
		if (data != null)
		{
			var rows = module.mod_search_vehicle.get_data_rows();

			console.log("Selected vehicle id: " + rows[data].ID);
			module.id_selected_vehicle = rows[data].ID;

			// set label
			var format = rows[data].TIPO +" "+
						rows[data].MARCA +" "+
						rows[data].MODELO +" "+
						rows[data].GENERACION +"<br>"+
						rows[data].PRECIO +" $";

			module.lbl_selected_vehicle.innerHTML = format;

		}
	}

	static callback_select_client (module, data)
	{
		if (data != null)
		{
			var rows = module.mod_search_client.get_data_rows();

			console.log("Selected client id: " + rows[data].ID);
			module.id_selected_client = rows[data].ID;

			// set label

			console.log(rows[data]);

			var format = rows[data].NOMBRES +" "+
						rows[data].APELLIDOS +"<br>"+
						rows[data].CEDULA +" ";

			module.lbl_selected_client.innerHTML = format;
		}
	}

}

function create_module_sale(post_request)
{
	var module = new module_sale();
	module.set_post_request(post_request);

	module.init();

	// set event listeners

    module.btn_invoke_vehicle.addEventListener('click',
        function(){
        	module.dialog_picker.setup(
        		"Seleccionar Vehiculo",
        		module.mod_search_vehicle,
        		module,
        		module_sale.callback_select_vehicle
        	);
        }
    );

    module.btn_invoke_client.addEventListener('click',
        function(){
			module.dialog_picker.setup(
        		"Seleccionar Cliente",
        		module.mod_search_client,
        		module,
        		module_sale.callback_select_client
        	);
        }
    );

	module.btn_send.addEventListener('click',
        function(){

			// send

			console.log(module.id_selected_client);
			console.log(module.id_selected_vehicle);

			var value_list = {};
			value_list["id_client"] = module.id_selected_client;
			value_list["id_vehicle"] = module.id_selected_vehicle;

        	var postObj = {
        		id: macro.SALES_PENDING_NEW,
        		data: value_list
        	};

        	module.post_request.request ( postObj,
				function(rows)
				{
					if (rows.data){
						show_message("Completado", "Solicitud de venta registrada correctamente.");
					}
					else{
	                    show_message("Error", "Hubo un error al realizar la operación.");
	                }
				}
        	);

        	// clear

        	module.reset()
        }
    );

    return module;
}
