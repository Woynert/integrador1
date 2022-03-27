

import {get_siblings} from '../utilities/misc.js';

import {show_message,
		in_creator} from '../index.js';

export {driver_module_search};

var max_rows = 10;

class driver_module_search
{
	static fetch_table_list_with_filter (module, custom_value_list)
	{

		//recopilate
		var value_list = {};

		if (!custom_value_list)
		{
			// extract values from inputs tags
			for (var value in module.input_filter)
			{

				if (module.input_filter[value]["check"].checked)
				{

					// check its empty
					let indata;
					let empty = false;

					//indata = in_creator.get_value(module.input_filter[value]["input"][0]);
					//empty = (indata == '');

					if (module.input_filter[value]["input"][0].typedate)
					{
						/*indata = in_creator.get_value(module.input_filter[value]["input"][1]);
						empty += (indata == '');*/

						empty =
						(in_creator.is_empty(module.input_filter[value]["input"][0]) ||
						in_creator.is_empty(module.input_filter[value]["input"][1]))
					}
					else
						empty = in_creator.is_empty(module.input_filter[value]["input"][0]);

					if (empty){
						console.log("empty");
						show_message("Alerta","Asegurese de rellenar los campos habilitados");
						return;
					}

					// is date (metadata)
					if (!module.input_filter[value]["input"][0].typedate)
					{
						value_list[value] = in_creator.get_value(module.input_filter[value]["input"][0]);
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

			// reset page
			module.page_number = 0;
			module.lbl_page_count.innerHTML = module.page_number+1;


			// make a copy
			module.filter_backup = {};
			Object.assign(module.filter_backup, value_list);

		}

		// custom value list provided
		else
		{
			value_list = custom_value_list;
		}

		// add page count
		value_list.page_number = module.page_number;
		console.log('module.page_number');
		console.log(module.page_number);

		// create object
		var postObj = {
			id: module.request.filter_search,
			data: value_list
		};

		console.log(postObj);

		module.post_request.request(postObj,
			function(rows)
			{
				// show search result

				if (!rows.data){
					module.lbl_no_result.style.display = "block";
					return;
				}

				// clear

			    module.tbl_list.innerHTML = "";
			    module.tbl_resume.innerHTML = "";

				if (rows.data[0])
				    module.data_rows = rows.data[0];

				if (rows.data[1])
				{
					console.log(rows.data[1][0].count);
				    module.page_max = Math.ceil (rows.data[1][0].count / max_rows) -1;
				}

				// results recieved

			    if (module.data_rows.length)
			    {
					module.lbl_no_result.style.display = "none";


					// populate

				    driver_module_search.populate_tbl_list_header (module);
				    var first_tr = driver_module_search.populate_tbl_list_content (module);

					// select the first one

				    if (rows.data.length > 0)
				    {
				    	module.selected_row = 0;
				    	driver_module_search.row_click (module, first_tr);
				    }

				    // show
				    //module.tbl_list.style.display = "block";
				    module.tbl_list.style.visibility = "visible";
				}

				// no results
				else{
					module.lbl_no_result.style.display = "block";
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
				driver_module_search.fetch_table_list_with_filter(module, null);
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

		// custom action
		if (typeof module.row_click_custom_action === "function") {
		    module.row_click_custom_action();
		}
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
		// reset
		module.tbl_filter.innerHTML = "";

		let rows = module.data_rows_type;
		var tr;
		var td;

		var checkbox;
		var input;
		var check;

		var myself = module;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			// only FILTER event

			if ((rows[i]["event"]) != "FILTER")
				continue;


			// checkbox

			checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.classList.add("srh_filter_checkbox");

			module.input_filter[ rows[i]['property'] ] =
			{
				"check" : checkbox,
				"input" : null
			};

			td = document.createElement('td');
			td.appendChild(checkbox);
			tr.appendChild(td);


			// label

			td = document.createElement('td');
			td.innerHTML = rows[i]['property'];
			tr.appendChild(td);


			// input

			switch (rows[i]['datatype'])
			{
				case 0: // string

					input      = document.createElement('input');
					input.disabled = true;
					in_creator.create(0, input);

					module.input_filter[ rows[i]['property'] ]["input"] = [input];

					break;

				case 1: // int

					input      = document.createElement('input');
					input.disabled = true;
					in_creator.create(1, input);

					module.input_filter[ rows[i]['property'] ]["input"] = [input];

					break;

				case 2: // date
					input = document.createElement('div');

					var input_date_start = document.createElement('input');
					var input_date_end   = document.createElement('input');

					input_date_start.disabled = true;
					input_date_end.disabled   = true;

					// meta data date
					input_date_start.typedate = true;
					input_date_end.typedate   = true;

					in_creator.create(2, input_date_start);
					in_creator.create(2, input_date_end);

					input_date_start.value = '1976-01-01';
					input_date_end.value = '2030-01-01';

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

			// disable input on check

			let inputarr = module.input_filter[ rows[i]['property'] ]["input"];

			checkbox.addEventListener('change', (event) => {

                var enabled = !event.currentTarget.checked;

                for (var k = 0; k < inputarr.length; k++)
                {
                    inputarr[k].disabled = enabled;
                }
            });

			if (input)
			{
				td = document.createElement('td');
				td.appendChild(input);
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

	static toggle_dialog_mode (module, boolean, new_dom_parent)
	{

		module.mode_dialog_select = boolean;
		module.toggle_dialog_custom_actions();

		// activate
		if (boolean)
		{
			new_dom_parent.appendChild (module.dom_element);
			module.dom_element.style.display = "block";

			// hide
			for (var i = 0; i < module.hide_in_dialog_mode.length; i++)
			{
				module.hide_in_dialog_mode[i].classList.add("hidden");
			}
		}

		// deactivate
		else
		{
			module.dom_original_parent.appendChild (module.dom_element);
			module.dom_element.style.display = "none";

			// show
			for (var i = 0; i < module.hide_in_dialog_mode.length; i++)
			{
				module.hide_in_dialog_mode[i].classList.remove("hidden");
			}
		}
	}

	// Page

	static page_back(module)
	{
		if (module.page_number > 0)
		{
			module.page_number -= 1;
			driver_module_search.fetch_table_list_with_filter(module, module.filter_backup);
			module.lbl_page_count.innerHTML = module.page_number+1;
		}
	}

	static page_next(module)
	{
		if (module.page_number < module.page_max)
		{
			module.page_number += 1;
			driver_module_search.fetch_table_list_with_filter(module, module.filter_backup);
			module.lbl_page_count.innerHTML = module.page_number+1;
		}
	}

}


