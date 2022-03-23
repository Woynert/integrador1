import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {driver_module_search} from './driver.js';
import {show_module} from '../index.js';
import {show_message} from '../index.js';

export {create_module_search_sale};

class module_search_sale extends module_template
{
	constructor()
	{
		super();
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
		this.btn_see_facture;

		this.tbl_filter;
		this.input_filter = {};
		this.input_filter_checkbox = {};

		// shared modules

		this.mod_edit;
		this.mod_register;
		this.mod_payment;
		this.mod_facture_viewer;
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

		//this.tbl_resume.style.display = "none";
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

	set_mod_payment(mod_payment){
		this.mod_payment = mod_payment;
	}

	set_mod_facture_viewer(mod_facture_viewer){
		this.mod_facture_viewer = mod_facture_viewer;
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

	static cancel_payment (module)
	{

		var item = module.data_rows[module.selected_row];

		var value_list = {}
		value_list.id_sale = item.id;

		var postObj = {
			id: macro.SALE_CANCEL_PAYMENT,
			data: value_list
		};

		module.post_request.request (postObj,
			function(rows)
			{
				if (rows.data)
					show_message("Completado", "Transacción cancelada con exito.");
				else
					show_message("Error", "Hubo un error al realizar la operación.");
			}
		);
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
			var rows = module.get_data_rows();
			var table_item_id = module.get_selected_row();
			var item = rows[table_item_id];

			console.log("MY VENTA");
			console.log("id_client " + item.id_client);
			console.log("id_vehicle " + item.id_vehicle);

			//driver_module_search.fetch_table_list_with_filter(module);

			module.mod_payment.setup(item);

			// show module payment
			show_module('payment');
		}
	);


	document.getElementById("srh_sale_btn_cancel_payment").addEventListener('click',
		function(){
			module_search_sale.cancel_payment (module);
		}
	);

	document.getElementById("srh_sale_btn_see_facture").addEventListener('click',
		function(){
			// show facture

			var rows = module.get_data_rows();
            var table_item_id = module.get_selected_row();
            var item = rows[table_item_id];

			console.log(item.id);

			// goto facture viewer
			show_module('facture_viewer');
			module.mod_facture_viewer.setup(item.id,
				function(){
					// return to this module
					console.log("MY CALLBACK");
					show_module('sale_search');
				}
			)
		}
	);

	module.init();

	return module;
}



