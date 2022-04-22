
import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {driver_module_search} from './driver.js';
import {show_module} from '../index.js';
import {driver_module_edit} from '../edit/driver.js';

export {create_module_search_vehicle};

class module_search_vehicle extends module_template
{
	constructor()
	{
		super();
		// vars

		this.page_max;
		this.page_number = 0;
		this.filter_backup = {};

		this.selected_row = -1;
		this.data_rows;
		this.data_rows_type;

		this.mode_dialog_select = false;

		// DOM elements

		this.dom_element;
		this.dom_original_parent;

		this.tbl_list;
		this.tbl_resume;
		this.btn_edit_row;
		this.lbl_no_result;
		this.btn_back;
		this.btn_next;
		this.lbl_page_count;

		this.btn_see_price_history;
		this.tbl_price_history;

		this.btn_export_inventory;

		this.tbl_filter;
		this.input_filter = {};

		this.hide_in_dialog_mode = [];

		// shared modules

		this.mod_edit;
		this.mod_register;
		this.post_request;
		this.mod_report_inventory_viewer;


		// request

		this.request = {
			"get_column_data" : macro.VEHICLE_GET_COLUMN_DATA,
			"filter_search"   : macro.VEHICLE_FILTER_SEARCH,
			"update_row"      : macro.VEHICLE_UPDATE_ROW,
			"insert_row"      : macro.VEHICLE_INSERT_ROW
		}

	}

	// initialize

	init ()
	{
		// get elements

		this.tbl_list     = document.getElementById ("srh_vehicle_tbl_list");
		this.tbl_filter   = document.getElementById ("srh_vehicle_tbl_filter");
		this.tbl_resume   = document.getElementById ("srh_vehicle_tbl_resume");
		this.btn_edit_row = document.getElementById ("srh_vehicle_btn_edit_row");
		this.btn_see_price_history = document.getElementById ("srh_vehicle_btn_see_price_history");
		this.tbl_price_history = document.getElementById("srh_vehicle_tbl_price_history");
		this.btn_export_inventory = document.getElementById ("srh_vehicle_btn_export_inventory");
		this.lbl_no_result = document.getElementById ("srh_vehicle_lbl_no_result");

		this.btn_back = document.getElementById ("srh_vehicle_btn_back");
		this.btn_next = document.getElementById ("srh_vehicle_btn_next");
		this.lbl_page_count = document.getElementById ("srh_vehicle_lbl_page_count");

		this.hide_in_dialog_mode = [
			//this.tbl_resume,
			this.btn_edit_row,
			document.getElementById ("srh_vehicle_title"),
			document.getElementById ("srh_vehicle_resume"),
			document.getElementById ("srh_vehicle_btn_see_price_history"),
			document.getElementById ("srh_vehicle_price"),
			document.getElementById ("srh_vehicle_btn_export_inventory")
		]
	}

	set_post_request (post_request){
		this.post_request = post_request;
	}

	set_mod_edit(mod_edit){
		this.mod_edit = mod_edit;
	}

	set_mod_register(mod_register){
		this.mod_register = mod_register;
	}

	set_mod_report_inventory_viewer(mod_report_inventory_viewer){
		this.mod_report_inventory_viewer = mod_report_inventory_viewer;
	}

	set_dom_element (dom_element){
		this.dom_element = dom_element;
	}

	set_dom_original_parent (dom_original_parent){
		this.dom_original_parent = dom_original_parent;
	}

	get_data_rows()
	{
		return this.data_rows;
	}

	get_selected_row()
	{
		return this.selected_row;
	}

	row_click_custom_action()
	{
		var item = this.get_data_rows()[this.get_selected_row()];
		console.log(item.marca);

		if (item.marca == 'conbin')
		{
			this.btn_edit_row.classList.remove('hidden');
		}
		else{
			this.btn_edit_row.classList.add('hidden');
		}

	}

	toggle_dialog_custom_actions()
	{
		// activate
		if (this.mode_dialog_select)
		{
			// hide old unfiltered results
		    this.tbl_list.style.visibility = "hidden";

			// set state filter to 'DISPONIBLE' and freeze it

			this.input_filter.estado.input[0].disabled = true;
			this.input_filter.estado.check.disabled    = true;
			this.input_filter.estado.input[0].value = 'DISPONIBLE';
			this.input_filter.estado.check.checked  = true;

			// deselect
			this.selected_row = -1;

			// filter
			driver_module_search.fetch_table_list_with_filter(this, null);
		}
		else
		{
			this.input_filter.estado.input[0].disabled = false;
			this.input_filter.estado.check.disabled    = false;
			this.input_filter.estado.input[0].value = '';
			this.input_filter.estado.check.checked = false;
		}
	}

	click_row_custom_actions()
	{}

	static fetch_table_prices(module)
	{

		var item;
		var value_list = {};

		item = module.get_data_rows()[module.get_selected_row()];
		value_list.marca = item.marca;
		value_list.id_from_marca = item.id_from_marca;

		let postObj = {
		    id: macro.VEHICLE_PRICE_SEARCH,
			data: value_list
		}

		// call fetch object
		module.post_request.request(postObj,
		function(rows)
		{

			var td;
			var tr;
			var arrprices = rows.data[0];


			// populate

			module.tbl_price_history.innerHTML = '';

			// header
			tr = document.createElement('tr');

			td = document.createElement('td');
			td.innerHTML = "Fecha";
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = "Precio";
			tr.appendChild(td);

			module.tbl_price_history.appendChild(tr);

			// content

			for (var i = 0; i < arrprices.length; i++)
			{
				tr = document.createElement('tr');

				td = document.createElement('td');
				td.innerHTML = arrprices[i].fecha;
				tr.appendChild(td);

				td = document.createElement('td');
				td.innerHTML = arrprices[i].precio;
				tr.appendChild(td);

				module.tbl_price_history.appendChild(tr);
			}
		}
		);
	}
}


// fabric

function create_module_search_vehicle (post_request)
{

	var module = new module_search_vehicle();
	module.set_post_request (post_request);
	module.init();

	// set event listeners

	document.getElementById("srh_vehicle_btn_filter").addEventListener('click',
		function(){
			driver_module_search.fetch_table_list_with_filter(module, null);
		}
	);

	document.getElementById("srh_vehicle_btn_edit_row").addEventListener('click',
		function(){

			//driver.mod_search.mod_edit

			if (module.mod_edit){
				show_module('vehicle_edit');
				driver_module_edit.press_edit_btn_fetch(module.mod_edit);
			}
		}
	);

	module.btn_back.addEventListener('click',
		function(){
			driver_module_search.page_back(module);
		}
	);

	module.btn_next.addEventListener('click',
		function(){
			driver_module_search.page_next(module);
		}
	);

	module.btn_see_price_history.addEventListener('click',
		function(){
			module_search_vehicle.fetch_table_prices(module);
		}
	);

	module.btn_export_inventory.addEventListener('click',
		function(){

			console.log("report inventory");

			// goto facture viewer
			show_module('report_inventory_viewer');
			module.mod_report_inventory_viewer.setup(
				function(){
					// return to this module
					console.log("MY CALLBACK");
					show_module('vehicle_search');
				}
			)
		}
	);

	return module;
}


