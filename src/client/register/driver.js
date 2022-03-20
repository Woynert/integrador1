
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

		var tr;
		var td;
		var input;

		// editable values

		for (var i = 0; i < rows_type.length; i++ ){

			// only EDIT events

			if (rows_type[i].event != "EDIT")
				continue;


			tr = document.createElement('tr');

			// label

			td = document.createElement('td');
			td.innerHTML = rows_type[i].property;
			tr.appendChild(td);

			// input

			td    = document.createElement('td');
			input = document.createElement('input');

			// set input type
            switch (rows_type[i].datatype)
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

			//input.value = module.item[rows_type[i].property];
			td.appendChild(input);
			tr.appendChild(td);

			// add to list

			module.input_elements[rows_type[i].property] = input;

			// append to resume table
			module.tbl_properties.appendChild(tr);
		}


	}

	static reset_input(module)
	{
		for (var value in module.input_elements)
		{
			module.input_elements[value].value = '';
		}
	}

	static press_reg_btn_fetch (module)
	{
		var id = module.mod_search.get_selected_row();

		// check it has something selected

		if (id >= 0)
		{
			//driver_module_register.get_item_from_row(module);
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
					driver_module_register.reset_input(module);
				}
				else{
                    show_message("Error", "Hubo un error al realizar la operación.");
                }
			}
		);
	}
}







