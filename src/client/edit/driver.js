
import {show_message} from '../index.js';

export {driver_module_edit}

class driver_module_edit
{
	static populate_table_properties (module)
	{
		// clear

		module.tbl_properties.innerHTML = "";

		// populate

		var rows_type = module.mod_search.data_rows_type;

		var tr;
		var td;
		var input;

		// add id (non editable)

		tr = document.createElement('tr');

		// label

		td = document.createElement('td');
		td.innerHTML = "id";
		tr.appendChild(td);

		td = document.createElement('td');
		input = document.createElement('input');
		input.type = 'text';
		input.disabled = "disabled";
		input.value = module.item.id

		td.appendChild(input);
		tr.appendChild(td);

		module.tbl_properties.appendChild(tr);
		module.input_elements['id'] = input;

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

			input.value = module.item[rows_type[i].property];
			td.appendChild(input);
			tr.appendChild(td);

			// add to list

			module.input_elements[rows_type[i].property] = input;

			// append to resume table
			module.tbl_properties.appendChild(tr);
		}
	}

	static press_edit_btn_fetch(module)
	{
		module.id = module.mod_search.get_selected_row();

		// check it has something selected

		if (module.id >= 0)
		{
			console.log("Editing row # " + module.id);

			module.get_item_from_row();

			driver_module_edit.populate_table_properties(module);
		}
	}

	static send_changes(module)
	{
		var value_list = {};

		// extract values from inputs tags
		for (var value in module.input_elements){
			value_list[value] = module.input_elements[value].value;
		}

		// create object
		var postObj = {
			id: module.request.update_row,
			data: value_list
		};

		module.post_request.request (postObj,
			function(rows)
			{
				if (rows.data)
					show_message("Completado", "El registro fue actualizado correctamente.");
				else
					show_message("Error", "Hubo un error al realizar la operación.");
			}
		);
	}

}





