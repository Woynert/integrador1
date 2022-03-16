
import {show_message} from '../index.js';

export {driver_module_register};

class driver_module_register
{
	// get from mod_search_vehicle

	static get_item_from_row (module)
	{
		var rows = module.mod_search.get_data_rows();

		module.item = rows[0];
	}

	static populate_table_properties (module)
	{
		// clear

		module.tbl_properties.innerHTML = "";

		// populate

		var rows_type = module.mod_search.data_rows_type;
		var types = {}
		//var defvalues = {}

		for (var i = 0; i < rows_type.length; i++)
		{
			types[rows_type[i].printname] = rows_type[i].datatype;
			//defvalues[rows_type[i].printname] = rows_type[i].defvalue;
		}
		//console.log(defvalues);

		var tr;
		var td;
		var input;

		for (var value in module.item)
		{

			// first item "ID"
			if (value == Object.keys(module.item)[0])
				continue;

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("myprp");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');

			input = document.createElement('input');

			// set input type
			switch (types[value])
			{
				case 0: // string
					input.type = "text";
					break;

				case 1: // int
					input.type = "number";
					break;

				case 2: // date
					input.type = "date";
					break;
			}

			//input.value = module.item[value];
			td.appendChild(input);
			tr.appendChild(td);

			module.input_elements[value] = input;

			// append to resume table
			module.tbl_properties.appendChild(tr);
		}
	}

	static press_reg_btn_fetch (module)
	{
		var id = module.mod_search.get_selected_row();

		// check it has something selected

		if (id >= 0)
		{
			driver_module_register.get_item_from_row(module);
			driver_module_register.populate_table_properties(module);
		}
	}

	static submit_new_row (module)
	{
		var value_list = {};

		// extract values from inputs tags
		for (var value in module.input_elements)
		{
			value_list[value] = module.input_elements[value].value;
		}

		// create object
		var postObj = {
			id: module.request.insert_row,
			data: value_list
		};

		module.post_request.request(postObj,
			function(rows)
			{
				if (rows.data){
					show_message("Completado", "El registro fue ejecutado correctamente.");
				}
			}
		);
	}
}







