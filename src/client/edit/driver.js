
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
        var types = {}

        for (var i = 0; i < rows_type.length; i++)
        {
            types[rows_type[i].printname] = rows_type[i].datatype;
        }

		var tr;
		var td;
		var input;

		for (var value in module.item)
		{

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
                    //.replace(/\//g,"-")
                    break;
            }

			input.value = module.item[value];
			td.appendChild(input);
			tr.appendChild(td);

			// firt item "ID"
			if (value == Object.keys(module.item)[0])
			{
				input.disabled = "disabled";
			}

			module.input_elements[value] = input;

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





