
import {show_message} from '../client.js';

export {create_register_vehicle,
		press_reg_btn_fetch};


class mod_register_vehicle
{
	constructor(search_vehicle, post_request)
	{
		this.item;

		this.search_vehicle = search_vehicle;
		this.post_request = post_request;

		this.tbl_properties;
		this.input_elements = {};
	}

	init()
	{
		// get elements
		this.tbl_properties = document.getElementById ("reg_tbl_vehicle_properties");
	}


	// get from mod_search_vehicle

	get_item_from_row()
	{
		var rows = this.search_vehicle.get_data_rows();

		this.item = rows[0];
		console.log(this.item)
	}

	populate_table_properties ()
	{
		// clear

		this.tbl_properties.innerHTML = "";

		// populate

		var tr;
		var td;
		var input;

		for (var value in this.item)
		{

			// first item "ID"
			if (value == Object.keys(this.item)[0])
				continue;

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("myprp");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');

			input = document.createElement('input');
			input.type = "text";
			//input.value = this.item[value];
			td.appendChild(input);
			tr.appendChild(td);

			//this.input_elements.push(input);
			this.input_elements[value] = input;

			// append to resume table
			this.tbl_properties.appendChild(tr);
		}
	}
}

function create_register_vehicle(search_vehicle, post_request)
{
	var register = new mod_register_vehicle(search_vehicle, post_request);

	// buttons
	document.getElementById("reg_btn_fetch").addEventListener('click',
		function(){
			press_reg_btn_fetch(register);
		}
	);

	document.getElementById("reg_btn_register").addEventListener('click',
		function(){

			var value_list = {};

			// extract values from inputs tags
			for (var value in register.input_elements)
			{
				value_list[value] = register.input_elements[value].value;
			}

			// create object
			var postObj = {
				id: 3,
				data: value_list
			};

			console.log(postObj);

			register.post_request.request(postObj,
			function(rows)
			{
				console.log(rows.data);
				if (rows.data){
					show_message("Exito", "El vehiculo fue registrado correctamente.");
				}
			}
			);

		}
	);

	register.init();
	return register;
}

function press_reg_btn_fetch(register)
{
	var id = register.search_vehicle.get_selected_row();

	// check it has something selected

	if (id >= 0)
	{
		register.get_item_from_row();
		register.populate_table_properties();
	}
}


