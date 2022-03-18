import {macro} from '../macro.js';
import {driver_module_search} from './driver.js';
import {show_module} from '../index.js';

export {create_module_search_sale};

class module_search_sale
{
	constructor()
	{
		// vars

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

		this.tbl_filter;
		this.input_filter = {};
		this.input_filter_checkbox = {};

		// shared modules

		this.mod_edit;
		this.mod_register;
		this.post_request;

		// request

		this.request = {
			get_column_data : macro.SALE_GET_COLUMN_DATA,
			filter_search   : macro.SALE_FILTER_SEARCH
			//update_row      : macro.CLIENT_UPDATE_ROW,
			//insert_row      : macro.CLIENT_INSERT_ROW
		}

	}

	// initialize

	init ()
	{
		// get elements

		this.tbl_list     = document.getElementById ("srh_sale_tbl_list");
		this.tbl_filter   = document.getElementById ("srh_sale_tbl_filter");
		this.tbl_resume   = document.getElementById ("srh_sale_tbl_resume");

		this.btn_edit_row = document.getElementById ("srh_sale_btn_edit_row");

		this.tbl_resume.style.display = "none";
		//this.btn_confirm_selection = document.getElementById ("srh_client_btn_confirm_selection");
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
}


// fabric

function create_module_search_sale (post_request)
{

	var module = new module_search_sale();
	module.set_post_request (post_request);

	// set event listeners

	document.getElementById("srh_sale_btn_filter").addEventListener('click',
		function(){
			driver_module_search.fetch_table_list_with_filter(module);
		}
	);

	document.getElementById("srh_sale_btn_payment").addEventListener('click',
		function(){
			console.log("B");
			//driver_module_search.fetch_table_list_with_filter(module);
		}
	);

	/*document.getElementById("srh_client_btn_edit_row").addEventListener('click',
		function(){

			//driver.mod_search.mod_edit

			if (module.mod_edit){
				show_module(4);
				driver_module_edit.press_edit_btn_fetch(module.mod_edit);
			}
		}
	);*/

	module.init();

	return module;
}



