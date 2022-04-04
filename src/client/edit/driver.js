
import {show_message,
		show_module,
		in_creator} from '../index.js';

export {driver_module_edit}

class driver_module_edit
{
	static populate_table_properties (module)
	{
		// clear

		module.tbl_properties.innerHTML = "";
		module.input_elements = {};
		module.input_elements_check = {};

		// populate

		var rows_type = module.mod_search.data_rows_type;

		var tr;
		var td;
		var checkbox;
		var input;

		// add id (non editable)

		tr = document.createElement('tr');

		// create disabled id field

		/*checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.disabled = true;
		td = document.createElement('td');
		td.appendChild(checkbox);
		tr.appendChild(td);
		// add cb to list
		module.input_elements_check['id'] = checkbox;

		td = document.createElement('td');
		td.innerHTML = "id";
		tr.appendChild(td);

		td = document.createElement('td');
		input = document.createElement('input');
		in_creator.create(0, input);

		//input.type = 'text';
		input.disabled = "disabled";
		input.value = module.item.id

		td.appendChild(input);
		tr.appendChild(td);

		module.tbl_properties.appendChild(tr);
		module.input_elements['id'] = [input];*/

		// create editable values

		for (var i = 0; i < rows_type.length; i++ ){

			// only EDIT events

			if (rows_type[i].event != "EDIT")
				continue;

			tr = document.createElement('tr');

			// checkbox

			checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.classList.add("srh_filter_checkbox");

			td = document.createElement('td');
			td.appendChild(checkbox);
			tr.appendChild(td);

			// add cb to list
			module.input_elements_check[rows_type[i].property] = checkbox;

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
                    input.disabled = true;

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
                    input1.disabled = true;
                    input2.disabled = true;


                    // add to list
                    module.input_elements[rows_type[i].property] = [input1, input2];
                    td.appendChild(input1);
                    td.appendChild(input2);

                    break;

				// selection string / selection string -> int
                case 4:
                case 5:
                    input = document.createElement('select');
                    input.disabled = true;
                    input.id_input = rows_type[i]['datatype'];

                    var options = JSON.parse(rows_type[i]['options']);

                    for (var opval in options)
                    {
                        var inputoption = document.createElement('option');
                        inputoption.innerHTML = opval;
                        inputoption.id_item = options[opval];
                        input.appendChild (inputoption);
                    }

                    module.input_elements[rows_type[i].property] = [input];
                    td.appendChild(input);

                    break;
            }

			// fill data

			switch (rows_type[i].datatype)
            {
                case 0: // string
					input.value = module.item[rows_type[i].property];
                	break;

                case 1: // int
                case 2: // date
					input.cleave.setRawValue( module.item[rows_type[i].property] );
                	break;

                case 3: // password
                	break;

                case 4: // selection string
                	for (var k = 0; k < input.options.length; k++)
                	{
                		if (input[k].value == module.item[rows_type[i].property])
                			input.selectedIndex = k;
                	}
                	break;

                case 5: // selection string -> int
                	for (var k = 0; k < input.options.length; k++)
                	{
                		if (input[k].id_item == module.item[rows_type[i].property])
                			input.selectedIndex = k;
                	}
                	break;
             }

			// disable input on check

			let inputarr = module.input_elements[rows_type[i].property];

			checkbox.addEventListener('change', (event) => {

				var enabled = !event.currentTarget.checked;

				for (var k = 0; k < inputarr.length; k++)
				{
					inputarr[k].disabled = enabled;
				}
			});

			// disable edit for specific

			if (!rows_type[i].editable)
			{
				checkbox.checked = true;
				checkbox.disabled = true;
			}


			tr.appendChild(td);

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

		var at_least_one_checked = false;
		var value_list = {};

		// extract values from inputs tags
        for (var value in module.input_elements)
        {
			// is id
			/*if (value == 'id')
			{
	            value_list[value] = in_creator.get_value(module.input_elements[value][0]);
				continue;
			}*/

			// not checked
			if (!module.input_elements_check[value].checked)
			{
	            value_list[value] = null;
				continue;
			}

			at_least_one_checked = true;

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

		if (!at_least_one_checked){
			show_message("Alerta", "No hay cambios");
			return;
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

	static reset(module)
	{

		// delete elements
		module.tbl_properties.innerHTML = "";

		// empty list
		module.input_elements = {};
	}

}





