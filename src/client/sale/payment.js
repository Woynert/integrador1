import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {show_message,
		in_creator} from '../index.js';

export {create_module_payment};

class module_payment extends module_template
{
	constructor()
	{
		super();

		// vars
		this.curret_item;

		// shared modules
		this.post_request;
		this.mod_search_sale;
		//this.mod_search_vehicle;
		//this.mod_search_client;

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


		new Cleave(this.tbx_credit_number, {
		    creditCard: true
		});

		new Cleave(this.date_expiration, {
		    date: true,
		    datePattern: ['m', 'y']
		});




	}

	set_post_request (post_request){
        this.post_request = post_request;
    }

    set_mod_search_sale (mod_search_sale){
        this.mod_search_sale = mod_search_sale;
    }

	// venta item from module_search_venta
    setup (item)
    {

    	this.current_item = item;

    	// set client info
    	this.lbl_client.innerHTML = item.nombres +" "+ item.apellidos +" "+ item.cedula;

    	// set vehicle info
    	this.lbl_vehicle.innerHTML = item.marca +" "+ item.modelo +" "+ item.generacion;

    	// set price
    	this.lbl_price.innerHTML = item.precio + " $";

    }

	static submit_payment(module)
	{
		// check input filled
		if ((module.tbx_credit_number.value == '') ||
			(module.tbx_cvv.value == '') ||
			(module.date_expiration.value == ''))
		{
			show_message("Aleta", "Por favor rellena todos los campos.");
			return;
		}

		var value_list = {}
		value_list.id_sale = module.current_item.id;
		value_list.payment_method = module.cbx_method.value;

		// create object
		var postObj = {
			id: macro.SALE_CONFIRM_PAYMENT,
			data: value_list
		};


		module.post_request.request(postObj,
			function(rows)
			{
				if (rows.data){
					show_message("Completado", "Transacción correcta.");
				}
				else{
					show_message("Error", "Hubo un error al realizar la operación.");
				}
			}
		);

	}

    /*fetch_info (id_client, id_vehicle)
    {
    }*/
}

function create_module_payment (post_request)
{
	var module = new module_payment();
	module.set_post_request(post_request);

	module.init();

	// eventos
	module.btn_submit.addEventListener('click',
        function(){
        	module_payment.submit_payment(module);
        }
    );

	return module;
}
