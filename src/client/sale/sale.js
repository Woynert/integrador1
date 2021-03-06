
import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {USER,
		show_message,
		in_creator} from '../index.js';
import {driver_module_search} from '../search/driver.js';

export {create_module_sale};

class module_sale extends module_template
{
	constructor()
	{
		super();

		// transaccional
		this.id_selected_vehicle   = null;
		this.vehicle_marca         = null;
		this.vehicle_id_from_marca = null;
		this.id_selected_client    = null;

		// elements
		this.btn_invoke_client;
		this.btn_invoke_vehicle;
		this.num_discount;
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
		this.btn_invoke_client = document.getElementById("sale_btn_invoke_client");
		this.btn_invoke_vehicle = document.getElementById("sale_btn_invoke_vehicle");
		this.num_discount = document.getElementById("sale_num_discount");
		this.btn_send = document.getElementById("sale_btn_send");

		this.lbl_selected_vehicle = document.getElementById("sale_lbl_selected_vehicle");
		this.lbl_selected_client = document.getElementById("sale_lbl_selected_client");

		in_creator.create(1, this.num_discount);

		// clamp to limit values
		this.num_discount.addEventListener('input',
			function()
			{
				let value = parseInt(this.cleave.getRawValue());
				let maxvalue = 100;

				if (value > maxvalue)
					this.cleave.setRawValue(maxvalue);
			}
		);
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
		this.id_selected_vehicle   = null;
		this.vehicle_marca         = null;
		this.vehicle_id_from_marca = null;
		this.id_selected_client    = null;

		this.lbl_selected_vehicle.innerHTML = "Ning??n vehiculo seleccionado";
		this.lbl_selected_client.innerHTML = "Ning??n cliente seleccionado";
		this.num_discount.value = '';

		//in_creator.create(1, this.num_discount);
    }

	static callback_select_vehicle (module, data)
	{
		if (data != null)
		{
			var rows = module.mod_search_vehicle.get_data_rows();

			console.log("Selected vehicle id: " + rows[data].id);
			module.id_selected_vehicle = rows[data].id;
			module.vehicle_marca         = rows[data].marca;
			module.vehicle_id_from_marca = rows[data].id_from_marca;

			// set label
			var format = rows[data].tipo_vehiculo +" "+
						rows[data].marca  +" "+
						rows[data].modelo +" "+
						rows[data].generacion +"<br>"+
						rows[data].precio +" $";

			module.lbl_selected_vehicle.innerHTML = format;

		}
	}

	static callback_select_client (module, data)
	{
		if (data != null)
		{
			var rows = module.mod_search_client.get_data_rows();

			console.log("Selected client id: " + rows[data].id);
			module.id_selected_client = rows[data].id;

			// set label

			//console.log(rows[data]);

			var format = rows[data].nombres +" "+
						rows[data].apellidos +"<br>"+
						rows[data].cedula +" ";

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
			var value_list = {};
			value_list["id_client"]   = module.id_selected_client;
			value_list["id_employee"] = USER.id;
			value_list["id_vehicle"]  = module.id_selected_vehicle;
			value_list["marca"]         = module.vehicle_marca;
			value_list["id_from_marca"] = module.vehicle_id_from_marca;
			value_list["discount"]    = module.num_discount.value;
			value_list["responsible"] = ''; // depends on matriz

			// check all input is filled
			if ((value_list["id_client"]   == null) ||
				(value_list["id_employee"] == null) ||
				(value_list["id_vehicle"]  == null) ||
				(value_list["discount"]    == ''))
			{
				show_message("Alerta","Por favor rellena todos los campos.");
				return;
			}
			if (value_list["discount"] > 100)
			{
				show_message("Alerta","El descuento no puede exceder el 100%.");
				return;
			}

        	var postObj = {
        		id: macro.SALES_PENDING_NEW,
        		data: value_list
        	};

        	module.post_request.request ( postObj,
				function(rows)
				{
					if (rows.data){
						show_message("Completado", "Solicitud de venta registrada correctamente.");
			        	// clear
			        	module.reset()
					}
					else{
	                    show_message("Error", "Hubo un error al realizar la operaci??n.");
	                }
				}
        	);


        }
    );

    return module;
}
