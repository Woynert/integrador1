
import {show_message} from '../index.js';


export {create_edit_vehicle,
		press_edit_btn_fetch};

class mod_edit_vehicle
{
	constructor(search_vehicle, post_request)
	{
		this.id = -1;
		this.item;
		this.search_vehicle = search_vehicle;

		this.post_request = post_request;

		this.tbl_properties;
		this.input_elements = {};
	}

	init()
	{
		// get elements

		this.tbl_properties = document.getElementById ("edit_tbl_vehicle_properties");
		//this.mod_search.tbl_resume   = document.getElementById ("tbl_resume");
	}


	get_item_from_row()
	{

		// get from search module

		var rows = this.search_vehicle.get_data_rows();

		this.item = rows[this.id];
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

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("myprp");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');

			input = document.createElement('input');
			input.type = "text";
			input.value = this.item[value];
			td.appendChild(input);
			tr.appendChild(td);

			// firt item "ID"
			if (value == Object.keys(this.item)[0])
			{
				input.disabled = "disabled";
			}

			//this.input_elements.push(input);
			this.input_elements[value] = input;

			// append to resume table
			this.tbl_properties.appendChild(tr);
		}
	}
}


function create_edit_vehicle(search_vehicle, post_request)
{
	var edit = new mod_edit_vehicle(search_vehicle, post_request);

	// buttons
	document.getElementById("edit_btn_fetch").addEventListener('click',
		function(){
			press_edit_btn_fetch(edit);
		}
	);

	document.getElementById("edit_btn_send_changes").addEventListener('click',
		function(){

			var value_list = {};

			// extract values from inputs tags
			for (var value in edit.input_elements){
				console.log(edit.input_elements[value]);
				value_list[value] = edit.input_elements[value].value;
			}

			// create object
			var postObj = {
				id: 2,
				data: value_list
			};

			console.log(postObj);

			edit.post_request.request(postObj,
			function(rows)
			{
				console.log(rows.data);
				if (rows.data){
					show_message("Exito", "El registro fue actualizado correctamente.");
				}
			}
			);

		}
	);

	edit.init();
	return edit;
}

function press_edit_btn_fetch(edit)
{
	edit.id = edit.search_vehicle.get_selected_row();

	// check it has something selected

	if (edit.id >= 0)
	{
		console.log("Editing row # " + edit.id);

		edit.get_item_from_row();

		edit.populate_table_properties();
	}
}
