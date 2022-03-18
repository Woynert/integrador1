
import {get_siblings} from '../utilities/misc.js';


export {driver_module_search};


class driver_module_search
{
	static fetch_table_list_with_filter (module)
	{

		//recopilate
		var value_list = {};

		// extract values from inputs tags
		for (var value in module.input_filter)
		{
			if (module.input_filter[value]["check"].checked)
			{

				// check date
				if (module.input_filter[value]["input"][0].type != "date")
				{
					value_list[value] = module.input_filter[value]["input"][0].value;
				}
				else
				{
					value_list[value + "_start"] = module.input_filter[value]["input"][0].value;
					value_list[value + "_end"  ] = module.input_filter[value]["input"][1].value;
				}
			}
			else
			{

				var type;
				var defvalue;
				var rows = module.data_rows_type;

				// get default value

				for (var i = 0; i < rows.length; i++)
				{
					if (rows[i]["property"] == value)
					{
						type     = rows[i]["datatype"];
						defvalue = rows[i]["defvalue"];
						break;
					}
				}

				// is not a date
				if (type != 2)
				{
					value_list[value] = defvalue;
				}
				else
				{
					value_list[value + "_start"] = "1900-01-01";
					value_list[value + "_end"]   = "3000-01-01";
				}

			}
		}

		// create object
		var postObj = {
			id: module.request.filter_search,
			data: value_list
		};

		module.post_request.request(postObj,
			function(rows)
			{
				// show search result

				console.log(rows);

				// clear

			    module.tbl_list.innerHTML = "";
			    module.tbl_resume.innerHTML = "";

			    // populate

			    module.data_rows = rows.data[0];
			    driver_module_search.populate_tbl_list_header (module);
			    var first_tr = driver_module_search.populate_tbl_list_content (module);

				// select the first one

			    if (rows.data.length > 0)
			    {
			    	module.selected_row = 0;
			    	driver_module_search.row_click (module, first_tr);

			        //press_reg_btn_fetch (module.mod_register);

			    }


			}
		);
	}

	static fetch_table_list_types (module)
	{
		let postObj = {
		    id: module.request.get_column_data
		}

		// call fetch object
		module.post_request.request(postObj,
		function(rows)
		{

	        module.data_rows_type = rows.data;

	        // populate just after
			if (driver_module_search.populate_tbl_filter (module))
			{
				driver_module_search.fetch_table_list_with_filter(module);
			}
		}
		);
	}

	// row click event

	static row_click (module, target_row)
	{

		var tr = target_row;
		tr.classList.add("selected");

		// deselect siblings

		var siblings = get_siblings(tr);

		for (var i = 0; i < siblings.length; i++)
		{
			siblings[i].classList.remove("selected");
		}

		// populate

		module.selected_row = parseInt(tr.arrayid);
		driver_module_search.populate_tbl_resume (module, module.data_rows [module.selected_row]);
	}


	/* ------- POPULATE TABLES --------*/

	// create table headers

	static populate_tbl_list_header (module)
	{
		let rows = module.data_rows;
		var tr;
		var td;

		// headers

		tr = document.createElement('tr');

		for (var value in rows[0])
		{
			td = document.createElement('td');
			td.innerHTML = value;
			tr.appendChild(td);
		}

		module.tbl_list.appendChild(tr);
	}

	// show data on table

	static populate_tbl_list_content (module)
	{
		let rows = module.data_rows;
		var tr;
		var td;

		var myself = module;

		var first_tr = null;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			if (first_tr == null)
			{
				first_tr = tr;
			}

			for (var value in rows[i])
			{
				td = document.createElement('td');
				td.innerHTML = rows[i][value];
				tr.appendChild(td);
			}

			// save the id inside the element
			tr.arrayid = i;

			// add mouse event
			tr.classList.add("row_item");
			tr.addEventListener('click',
				function()
				{
					driver_module_search.row_click (module, this);
				}
			);
			module.tbl_list.appendChild(tr);
		}

		return first_tr;

	}


	static populate_tbl_resume (module, item)
	{

		// clear

		module.tbl_resume.innerHTML = "";

		// populate

		var tr;
		var td;

		for (var value in item)
		{

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("resumen_key");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = item[value];
			tr.appendChild(td);

			// append to resume table
			module.tbl_resume.appendChild(tr);
		}

	}

	static populate_tbl_filter (module)
	{
		let rows = module.data_rows_type;
		var tr;
		var td;

		var input;
		var check;

		var myself = module;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			for (var value in rows[i])
			{

				// dont display default value

				if (value == "defvalue")
					continue;

				td = document.createElement('td');

				// column name for property's type (see table_vehicle.sql)

				if (value == "id")
				{
					// input_filter_checkbox

					input      = document.createElement('input');
					input.type = "checkbox";

					module.input_filter[ rows[i]['property'] ] =
					{
						"check" : input,
						"input" : null
					};

					td.appendChild(input);
				}

				else if (value == "datatype")
				{

					// create respective input

					switch (rows[i][value])
					{
						case 0: // string

							input      = document.createElement('input');
							input.type = "text";

							module.input_filter[ rows[i]['property'] ]["input"] = [input];

							break;

						case 1: // int

							input      = document.createElement('input');
							input.type = "number";

							module.input_filter[ rows[i]['property'] ]["input"] = [input];

							break;

						case 2: // date
							input = document.createElement('div');

							var input_date_start = document.createElement('input');
							var input_date_end   = document.createElement('input');

							input_date_start.type = "date";
							input_date_end.type   = "date";

							input_date_start.value = '1976-01-01';
							input_date_end.value   = '2030-01-01';

							input.appendChild(input_date_start);
							input.appendChild(input_date_end);

							// column name for property's name (see table_vehicle.sql and server.js)

							module.input_filter[ rows[i]['property'] ]["input"] =
							[
								input_date_start,
								input_date_end
							];

							break;
					}

					td.appendChild(input);

				}

				else
				{
					td.innerHTML = rows[i][value];
				}

				tr.appendChild(td);


			}

			module.tbl_filter.appendChild(tr);


		}

		return true;

	}

	/*static set_dialog_mode (module, boolean)
	{

		module.mode_dialog_select = boolean

		// activate
		if (boolean)
		{
			module.btn_confirm_selection.style.display = "block";
		}

		// deactivate
		else
		{
			module.btn_confirm_selection.style.display = "none";
		}
	}*/

	static toggle_dialog_mode (search_module, boolean, new_dom_parent)
	{

		search_module.mode_dialog_select = boolean;

		// activate
		if (boolean)
		{
			new_dom_parent.appendChild (search_module.dom_element);
			search_module.dom_element.style.display = "block";
			//search_module.btn_confirm_selection.style.display = "block";
		}

		// deactivate
		else
		{
			search_module.dom_original_parent.appendChild (search_module.dom_element);
			search_module.dom_element.style.display = "none";
			//search_module.btn_confirm_selection.style.display = "none";
		}
	}

}


