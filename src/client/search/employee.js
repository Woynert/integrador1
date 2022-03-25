import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {driver_module_search} from './driver.js';
import {show_module} from '../index.js';
import {driver_module_edit} from '../edit/driver.js';

//import {show_message} from '../index.js';

export {create_module_search_employee};

class module_search_employee extends module_template
{
	constructor()
	{
		super();
		// vars

		this.page_number = 0;
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

		this.tbl_filter;
		this.input_filter = {};


		// shared modules

		this.mod_edit;
		this.mod_register;
		this.post_request;

		// request

		this.request = {
			get_column_data : macro.EMPLOYEE_GET_COLUMN_DATA,
			filter_search   : macro.EMPLOYEE_FILTER_SEARCH,
			update_row      : macro.EMPLOYEE_UPDATE_ROW,
			insert_row      : macro.EMPLOYEE_INSERT_ROW
		}

	}

	// initialize

	init ()
	{
		// get elements

		this.tbl_list     = document.getElementById ("srh_employee_tbl_list");
		this.tbl_filter   = document.getElementById ("srh_employee_tbl_filter");
		this.tbl_resume   = document.getElementById ("srh_employee_tbl_resume");

		this.btn_edit_row = document.getElementById ("srh_employee_btn_edit");
		this.lbl_no_result = document.getElementById ("srh_employee_lbl_no_result");

		this.btn_back = document.getElementById ("srh_employee_btn_back");
		this.btn_next = document.getElementById ("srh_employee_btn_next");
		this.lbl_page_count = document.getElementById ("srh_employee_lbl_page_count");
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

function create_module_search_employee (post_request)
{

	var module = new module_search_employee();
	module.set_post_request (post_request);
	module.init();

	// set event listeners

	document.getElementById("srh_employee_btn_filter").addEventListener('click',
		function(){
			driver_module_search.fetch_table_list_with_filter(module);
		}
	);

	document.getElementById("srh_employee_btn_edit").addEventListener('click',
		function(){
			if (module.mod_edit){
				show_module('employee_edit');
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

	return module;
}



