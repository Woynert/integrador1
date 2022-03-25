
import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {show_message} from '../index.js';
import {driver_module_register} from './driver.js';

export {create_module_register_employee};


class module_register_employee extends module_template
{
	constructor()
	{
		super();
		this.item;

		this.tbl_properties;
		this.input_elements = {};

		// modules

		this.mod_search;
		this.post_request;

		// requests

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
		this.tbl_properties = document.getElementById ("reg_employee_tbl_properties");
	}

	set_post_request (post_request){
        this.post_request = post_request;
    }

    set_mod_search (mod_search){
        this.mod_search = mod_search;
    }

    enter()
    {
    	driver_module_register.press_reg_btn_fetch(this);
    }
}

function create_module_register_employee (post_request)
{
	var module = new module_register_employee ();
	module.set_post_request (post_request);

	// buttons
	/*document.getElementById("reg_employee_btn_fetch").addEventListener('click',
		function(){
			driver_module_register.press_reg_btn_fetch(module);
		}
	);*/

	document.getElementById("reg_employee_btn_register").addEventListener('click',
		function(){
			driver_module_register.submit_new_row(module);
		}
	);

	module.init();
	return module;
}
