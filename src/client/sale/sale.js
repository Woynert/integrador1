
import {driver_module_search} from '../search/driver.js';

export {create_module_sale};

class module_sale
{
	constructor()
	{

		// transaccional
		this.id_selected_vehicle;
		this.id_selected_client;

		// elements
		this.btn_invoke_vehicle;
		this.btn_invoke_client;

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

		this.lbl_selected_vehicle = document.getElementById("sale_lbl_selected_vehicle");
		this.lbl_selected_client = document.getElementById("sale_lbl_selected_client");

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

	static callback_select_vehicle (module, data)
	{
		if (data != null)
		{
			module.id_selected_vehicle = data;

			// set label
			var rows = module.mod_search_vehicle.get_data_rows();
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
			module.id_selected_client = data;

			// set label

			var rows = module.mod_search_client.get_data_rows();
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

    return module;
}
