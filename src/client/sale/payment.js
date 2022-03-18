import {macro} from '../macro.js';
import {show_message} from '../index.js';

export {create_module_payment};

class module_sale
{
	constructor()
	{
		// shared modules
		this.post_request;
		this.mod_search_sale;

		// elements
		this.lbl_client;
		this.lbl_vehicle;
		this.lbl_price;
		this.cbx_method;
		this.tbx_credit_number;
		this.tbx_cvv;
		this.date_expiration;
		this.btn_submit;
	}

	init()
	{
		this.lbl_client        = document.getElementById("payment_lbl_client");
		this.lbl_vehicle       = document.getElementById("payment_lbl_vehicle");
		this.lbl_price         = document.getElementById("payment_lbl_price");
		this.cbx_method        = document.getElementById("payment_cbx_method");
		this.tbx_credit_number = document.getElementById("payment_tbx_credit_number");
		this.tbx_cvv           = document.getElementById("payment_tbx_cvv");
		this.date_expiration   = document.getElementById("payment_date_expiration");
		this.btn_submit        = document.getElementById("payment_btn_submit");
	}

	set_post_request (post_request){
        this.post_request = post_request;
    }

    set_mod_search_sale (mod_search_sale){
        this.mod_search_sale = mod_search_sale;
    }
}

function create_module_payment (post_request)
{
	var module = new module_sale();
	module.set_post_request(post_request);

	module.init();

	// eventos
	module.btn_submit.addEventListener('click',
        function(){
        	console.log("Culaquier cosa");
        }
    );

	return module;
}
