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
		this.btn_see_facture;
		this.btn_see_report_money;
		this.lbl_no_result;

		this.btn_back;
		this.btn_next;
		this.lbl_page_count;

		this.tbl_filter;
		this.input_filter = {};

		// shared modules

		this.mod_edit;
		this.mod_register;
		this.mod_payment;
		this.mod_facture_viewer;
		this.mod_report_money_viewer;
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

		this.btn_filter   = document.getElementById ("srh_sale_btn_filter");
		this.btn_edit_row = document.getElementById ("srh_sale_btn_edit_row");
		this.btn_make_payment   = document.getElementById ("srh_sale_btn_make_payment");
		this.btn_cancel_payment = document.getElementById ("srh_sale_btn_cancel_payment");
		this.btn_see_facture    = document.getElementById ("srh_sale_btn_see_facture");
		this.btn_see_report_money = document.getElementById ("srh_sale_btn_see_report_money");
		this.lbl_no_result = document.getElementById ("srh_sale_lbl_no_result");

		this.btn_back = document.getElementById ("srh_sale_btn_back");
		this.btn_next = document.getElementById ("srh_sale_btn_next");
		this.lbl_page_count = document.getElementById ("srh_sale_lbl_page_count");
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

	set_mod_report_money_viewer(mod_report_money_viewer){
		this.mod_report_money_viewer = mod_report_money_viewer;
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

	enter()
	{
		driver_module_search.fetch_table_list_with_filter(this, null);
	}

	row_click_custom_action()
	{
		var item = this.get_data_rows()[this.get_selected_row()];
		console.log(item.state);

		if (item.state == 'PENDIENTE')
		{
			this.btn_cancel_payment.classList.remove('hidden');
			this.btn_make_payment.classList.remove('hidden');
		}
		else{
			this.btn_cancel_payment.classList.add('hidden');
			this.btn_make_payment.classList.add('hidden');
		}

		if (item.state == 'PAGADO')
		{
			this.btn_see_facture.classList.remove('hidden');
		}
		else
		{
			this.btn_see_facture.classList.add('hidden');
		}

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
					show_message("Completado", "Transacci??n cancelada con exito.");
				else
					show_message("Error", "Hubo un error al realizar la operaci??n.");
			}
		);
	}
}


// fabric

function create_module_search_sale (post_request)
{

	var module = new module_search_sale();
	module.set_post_request (post_request);
	module.init();

	// set event listeners

	module.btn_filter.addEventListener('click',
		function(){
			driver_module_search.fetch_table_list_with_filter(module, null);
		}
	);

	module.btn_make_payment.addEventListener('click',
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


	module.btn_cancel_payment.addEventListener('click',
		function(){
			module_search_sale.cancel_payment (module);
		}
	);

	module.btn_see_facture.addEventListener('click',
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

	module.btn_see_report_money.addEventListener('click',
		function(){

			console.log("report money");


			// goto facture viewer
			show_module('report_money_viewer');
			module.mod_report_money_viewer.setup(
				function(){
					// return to this module
					console.log("MY CALLBACK");
					show_module('sale_search');
				}
			)
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



