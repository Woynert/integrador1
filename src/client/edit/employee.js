
import {macro} from '../macro.js';
import {show_message} from '../index.js';
import {driver_module_edit} from './driver.js';

export {create_module_edit_employee};

class module_edit_employee
{
	constructor()
	{
		this.id = -1;
		this.item;

		this.mod_search;
		this.post_request;

		this.tbl_properties;
		this.input_elements = {};

		// request

        this.request = {
            "get_column_data" : macro.EMPLOYEE_GET_COLUMN_DATA,
            "filter_search"   : macro.EMPLOYEE_FILTER_SEARCH,
            "update_row"      : macro.EMPLOYEE_UPDATE_ROW,
            "insert_row"      : macro.EMPLOYEE_INSERT_ROW
        }

	}

	init()
	{
		// get elements

		this.tbl_properties = document.getElementById ("edit_employee_tbl_properties");
	}

	set_post_request (post_request){
        this.post_request = post_request;
    }

    set_mod_search (mod_search){
        this.mod_search = mod_search;
    }

	get_item_from_row()
	{
		// get from search module

		var rows = this.mod_search.get_data_rows();

		this.item = rows[this.id];
	}
}


function create_module_edit_employee (post_request)
{
	var module = new module_edit_employee();
	module.set_post_request(post_request);

	// buttons
	document.getElementById("edit_employee_btn_fetch").addEventListener('click',
		function(){
			driver_module_edit.press_edit_btn_fetch(module);
		}
	);

	document.getElementById("edit_employee_btn_send_changes").addEventListener('click',
		function(){
			driver_module_edit.send_changes(module);
		}
	);

	module.init();
	return module;
}
