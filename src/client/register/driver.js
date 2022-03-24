
import {show_message,
		in_creator} from '../index.js';

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

			td = document.createElement('td');

            switch (rows_type[i].datatype)
            {
                case 0: // string
                case 1: // int
                case 2: // date
	                input = document.createElement('input');

					// set input type
					in_creator.create(rows_type[i].datatype, input);

					// add to list
					module.input_elements[rows_type[i].property] = [input];
					td.appendChild(input);

                	break;

                case 3: // password
	                let input1 = document.createElement('input');
	                let input2 = document.createElement('input');
					in_creator.create(rows_type[i].datatype, input1);
					in_creator.create(rows_type[i].datatype, input2);
                	input1.type = "password";
                	input2.type = "password";

                	// add to list
					module.input_elements[rows_type[i].property] = [input1, input2];
					td.appendChild(input1);
					td.appendChild(input2);

                	break;
			}

			tr.appendChild(td);

			// append to resume table
			module.tbl_properties.appendChild(tr);
		}


	}

	static reset_input(module)
	{
		for (var value in module.input_elements)
		{
			module.input_elements[value][0].value = '';

			if (module.input_elements[value][1])
				module.input_elements[value][1].value = '';
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
			// password
			if (module.input_elements[value][0].type == 'password')
			{
				let pass1 = in_creator.get_value(module.input_elements[value][0]);
				let pass2 = in_creator.get_value(module.input_elements[value][1]);

				if (pass1 != pass2)
				{
					show_message("Alerta", "Las constraseñas no coinciden");
					return;
				}

				// check password strength
				if (!in_creator.pass_strength_check(pass1))
				{
					show_message("Contraseña debil",
					"La contraseña debe tener<br>" +
					"- Al menos una letra en minuscula<br>" +
					"- Al menos una letra en mayuscula<br>" +
					"- Al menos un número<br>" +
					"- Al menos un caracter especial (!@#$%^&*)<br>" +
					"- Al menos 8 caracteres de longitud<br>"
					);
					return;
				}
			}

			value_list[value] = in_creator.get_value(module.input_elements[value][0]);

			// check emptyness
			if (in_creator.is_empty(module.input_elements[value][0]))
			{
				show_message("Alerta", "Por favor rellene todos los campos");
				return;
			}
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







