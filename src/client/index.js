
import {get_siblings,
		get_cookie} from './utilities/misc.js';
import {create_driver_post_request} from './post_request.js';

import {driver_module_search} from './search/driver.js';
import {create_module_search_vehicle}  from './search/vehicle.js';
import {create_module_search_client}   from './search/client.js';
import {create_module_search_sale}     from './search/sale.js';
import {create_module_search_employee} from './search/employee.js';

import {driver_module_edit} from './edit/driver.js';
import {create_module_edit_vehicle}  from './edit/vehicle.js'
import {create_module_edit_client}   from './edit/client.js'
import {create_module_edit_employee} from './edit/employee.js'

import {driver_module_register} from './register/driver.js';
import {create_module_register_vehicle}  from './register/vehicle.js'
import {create_module_register_client}   from './register/client.js'
import {create_module_register_employee} from './register/employee.js'

import {create_module_sale}   from './sale/sale.js';
import {create_dialog_picker} from './sale/dialog_picker.js';

import {create_module_payment} from './sale/payment.js';


export {show_module,
		show_message};

// modules

//var selected_module = ''; // start on ventas by default
var selected_module;
//var available_modules = [];
var available_modules = {};
var module_container;

// buttons

var btn_logout;
/*var btn_goto_vehicle_search;
var btn_goto_vehicle_edit;
var btn_goto_vehicle_register;
var btn_goto_client_search;
var btn_goto_client_edit;
var btn_goto_client_register;
var btn_goto_sale;
var btn_goto_payment;
var btn_goto_sale_search;
var btn_goto_employee_search;
var btn_goto_employee_edit;
var btn_goto_employee_register;*/

var btns = {};

// vehicle

var vehicle_search;
var vehicle_search_div;
var vehicle_edit;
var vehicle_edit_div;
var vehicle_register;
var vehicle_register_div;

// client

var client_search;
var client_search_div;
var client_edit;
var client_edit_div;
var client_register;
var client_register_div;

// sale

var sale;
var sale_div;
var sale_search;
var sale_search_div;

var payment;
var payment_div;

var dialog_picker;
var dialog_picker_div;

// employee

var employee_search;
var employee_search_div;
var employee_edit;
var employee_edit_div;
var employee_register;
var employee_register_div;

// message

var div_message;
var message_timeout;


// XHR

var post_request;

var reader = new XMLHttpRequest();

const files =
{
	vehicle_search   : './search/vehicle.html',
	vehicle_edit     : './edit/vehicle.html',
	vehicle_register : './register/vehicle.html',

	client_search   : './search/client.html',
	client_edit     : './edit/client.html',
	client_register : './register/client.html',

	sale          : './sale/sale.html',
	dialog_picker : './sale/dialog_picker.html',
	sale_search   : './search/sale.html',
	payment       : './sale/payment.html',

	employee_search   : './search/employee.html',
	employee_edit     : './edit/employee.html',
	employee_register : './register/employee.html'
}

const elements_by_module = {};

elements_by_module.vehicle_search   = ['btn_goto_vehicle_search'];
elements_by_module.vehicle_edit     = ['btn_goto_vehicle_edit'];
elements_by_module.vehicle_register = ['btn_goto_vehicle_register'];

elements_by_module.client_search   = ['btn_goto_client_search'];
elements_by_module.client_edit     = ['btn_goto_client_edit'];
elements_by_module.client_register = ['btn_goto_client_register'];

elements_by_module.sale          = ['btn_goto_sale'];
elements_by_module.dialog_picker = [''];
elements_by_module.sale_search   = ['btn_goto_sale_search'];
elements_by_module.payment       = ['btn_goto_payment'];

elements_by_module.employee_search   = ['btn_goto_employee_search'];
elements_by_module.employee_edit     = ['btn_goto_employee_edit'];
elements_by_module.employee_register = ['btn_goto_employee_register'];


var files_to_load = []

var current_loading_file = 0;

// session

var user = {}

// wait till fully loaded

document.onreadystatechange = function () {
if (document.readyState == "complete")
{
	// check cookies
	console.log(get_cookie("userid"));
	console.log(get_cookie("username"));
	console.log(get_cookie("userlastname"));
	console.log(get_cookie("userrole"));

	user.id       = get_cookie("userid");
	user.name     = get_cookie("username");
	user.lastname = get_cookie("userlastname");
	user.role     = get_cookie("userrole");

	files_to_load_by_role();

	init ();
}}

function files_to_load_by_role()
{
	switch (user.role)
	{
		// ADMIN
		case '0':
			selected_module = 'vehicle_search';
			files_to_load.push('vehicle_search')
			files_to_load.push('vehicle_edit')
			files_to_load.push('vehicle_register')

			files_to_load.push('client_search')
			files_to_load.push('client_edit')
			files_to_load.push('client_register')

			files_to_load.push('employee_search')
			files_to_load.push('employee_edit')
			files_to_load.push('employee_register')

			files_to_load.push('sale')
			files_to_load.push('dialog_picker')
			files_to_load.push('sale_search')
			files_to_load.push('payment')
			break;

		// asesor comercial
		case '1':
			selected_module = 'vehicle_search';
			files_to_load.push('vehicle_search')
			files_to_load.push('vehicle_register')

			files_to_load.push('client_search')
			files_to_load.push('client_edit')
			files_to_load.push('client_register')

			files_to_load.push('sale')
			files_to_load.push('dialog_picker')
			files_to_load.push('sale_search')
			//files_to_load.push('payment')
			break;

		// cajero
		case '2':
			selected_module = 'sale_search';
			//files_to_load.push('sale')
			//files_to_load.push('dialog_picker')
			files_to_load.push('sale_search')
			files_to_load.push('payment')
			break;

		default:
			selected_module = 'vehicle_search';
			files_to_load.push('vehicle_search')
			break;
	}

}

// load html files

function load_file(url)
{
    reader.open('get', url, true);
    reader.onreadystatechange = read_file;
    reader.send(null);
}

function read_file(){
    if (reader.readyState == 4)
    {

		//console.log("my files");
		//console.log(files[files_to_load[current_loading_file]]);
		//console.log(files['vehicle_search']);
		//console.log("my reader response");
		//console.log(reader.responseText);

		switch (files[files_to_load[current_loading_file]])
		{

			// vehicle

			// ./search/vehicle.html
			case files.vehicle_search: //0
				vehicle_search_div.innerHTML = reader.responseText;
		       	vehicle_search = create_module_search_vehicle (post_request);
				break;

			// ./edit/vehicle.html
			case files.vehicle_edit:
				vehicle_edit_div.innerHTML = reader.responseText;
		       	vehicle_edit = create_module_edit_vehicle (post_request);
				break;

			// ./register/vehicle.html
			case files.vehicle_register:
				vehicle_register_div.innerHTML = reader.responseText;
		       	vehicle_register = create_module_register_vehicle (post_request);
				break;

			// client

			// ./search/client.html
			case files.client_search:
				client_search_div.innerHTML = reader.responseText;
		       	client_search = create_module_search_client (post_request);
				break;

			// ./edit/client.html
			case files.client_edit:
				client_edit_div.innerHTML = reader.responseText;
		       	client_edit = create_module_edit_client (post_request);
				break;

			// ./register/client.html
			case files.client_register:
				client_register_div.innerHTML = reader.responseText;
		       	client_register = create_module_register_client (post_request);
				break;

			// ./sale/sale.html
			case files.sale:
				sale_div.innerHTML = reader.responseText;
		       	sale = create_module_sale (post_request);
				break;

			// ./sale/dialog_picker.html
			case files.dialog_picker:
				dialog_picker_div.innerHTML = reader.responseText;
				dialog_picker = create_dialog_picker();
				break;

			// ./search/sale.html
			case files.sale_search:
				sale_search_div.innerHTML = reader.responseText;
		       	sale_search = create_module_search_sale (post_request);
				break;

			// ./sale/payment.html
			case files.payment:
				payment_div.innerHTML = reader.responseText;
		       	payment = create_module_payment (post_request);
				break;

			// ./search/employee.html
			case files.employee_search:
				employee_search_div.innerHTML = reader.responseText;
		       	employee_search = create_module_search_employee (post_request);
				break;

			// ./edit/employee.html
			case files.employee_edit:
				employee_edit_div.innerHTML = reader.responseText;
		       	employee_edit = create_module_edit_employee (post_request);
				break;

			// ./register/employee.html
			case files.employee_register:
				employee_register_div.innerHTML = reader.responseText;
		       	employee_register = create_module_register_employee (post_request);
				break;
		}


		// next
		if (current_loading_file < files_to_load.length-1)
		{
			console.log(1);
			current_loading_file += 1;
			load_file(files[files_to_load[current_loading_file]]);
		}

		// all modules loaded
		else
		{

			// vehicle module
			if (vehicle_search){
				vehicle_search.set_dom_element (vehicle_search_div);
				vehicle_search.set_dom_original_parent (vehicle_search_div.parentElement);
				driver_module_search.fetch_table_list_types (vehicle_search);
			}

			if (vehicle_edit){
				vehicle_edit.set_mod_search (vehicle_search);
				vehicle_search.set_mod_edit (vehicle_edit);
			}

			if (vehicle_register)
				vehicle_register.set_mod_search (vehicle_search);


			// client module
			if (client_search){
				client_search.set_dom_element (client_search_div);
				client_search.set_dom_original_parent (client_search_div.parentElement);
				driver_module_search.fetch_table_list_types (client_search);
			}

			if (client_edit){
				client_edit.set_mod_search (client_search);
				client_search.set_mod_edit (client_edit);
			}

			if (client_register)
				client_register.set_mod_search (client_search);


			// employeee
			if (employee_search){
				employee_search.set_mod_edit (employee_edit);
				employee_edit.set_mod_search (employee_search);
				employee_register.set_mod_search (employee_search);
				driver_module_search.fetch_table_list_types (employee_search);
			}


			// sale
			if (sale){
				sale.set_mod_search_vehicle (vehicle_search);
				sale.set_mod_search_client (client_search);
				sale.set_dialog_picker (dialog_picker);
			}

			if (sale_search){
				sale_search.set_mod_payment (payment);
				driver_module_search.fetch_table_list_types (sale_search);
			}

			// show selected
			show_module (selected_module);
		}

    }
}

function show_module(module_id)
{

	let div_selected_module = available_modules[module_id];
	let children = module_container.children;

	for (var i = 0; i < children.length; i++)
	{
		children[i].style.display="none";
	}

	div_selected_module.style.display="block";

	/*/ actions on switch module event
	switch(module_id)
		case 1: //edit vehicle module
	}*/

}

function show_message(title, text)
{

	// make visible
	div_message.getElementsByTagName('b')[0].innerHTML = title;
	div_message.getElementsByTagName('p')[0].innerHTML = text;

	div_message.style.display = 'block';


	// set timeout
	if (message_timeout){
		clearTimeout(message_timeout);
	}

	setTimeout(
		function()
		{
			div_message.style.display = 'none';
		}
	, 5000);
}


function set_btn_events()
{
	// logout

	if (btn_logout)
	btn_logout.addEventListener('click',
		function (){
			window.location.replace(window.location.origin);
		}
	);

	// menu buttons

	/*var btn;
	btn = document.getElementByName

	if (btns.btn_goto_vehicle_search)
	btns.btn_goto_vehicle_search.addEventListener('click',
		function (){
			selected_module = 'vehicle_search';
			show_module (selected_module);
		});

	if (btns.btn_goto_vehicle_edit)
	btns.btn_goto_vehicle_edit.addEventListener('click',
		function (){
			selected_module = 'vehicle_edit';
			show_module (selected_module);
		});

	if (btns.btn_goto_vehicle_register)
	btns.btn_goto_vehicle_register.addEventListener('click',
		function (){
			selected_module = 2;
			show_module (selected_module);
			driver_module_register.press_reg_btn_fetch (vehicle_register);
		}
	);

	if (btns.btn_goto_client_search)
	btns.btn_goto_client_search.addEventListener('click',
		function (){
			selected_module = 3;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_client_edit)
	btns.btn_goto_client_edit.addEventListener('click',
		function (){
			selected_module = 4;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_client_register)
	btns.btn_goto_client_register.addEventListener('click',
		function (){
			selected_module = 5;
			show_module (selected_module);
			driver_module_register.press_reg_btn_fetch (client_register);
		}
	);

	if (btns.btn_goto_sale)
	btns.btn_goto_sale.addEventListener('click',
		function (){
			selected_module = 6;
			show_module (selected_module);
		}
	);

	// 7 dialog picker

	if (btns.btn_goto_sale_search)
	btns.btn_goto_sale_search.addEventListener('click',
		function (){
			selected_module = 8;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_payment)
	btns.btn_goto_payment.addEventListener('click',
		function (){
			selected_module = 9;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_employee_search)
	btns.btn_goto_employee_search.addEventListener('click',
		function (){
			selected_module = 10;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_employee_edit)
	btns.btn_goto_employee_edit.addEventListener('click',
		function (){
			selected_module = 11;
			show_module (selected_module);
		}
	);

	if (btns.btn_goto_employee_register)
	btns.btn_goto_employee_register.addEventListener('click',
		function (){
			selected_module = 12;
			show_module (selected_module);
			driver_module_register.press_reg_btn_fetch (employee_register);
		}
	);*/
}

function init()
{

	// get buttons

	// obligatory
	btn_logout = document.getElementById('btn_logout');


	// hide all buttons

	for (var value in elements_by_module)
	{
		for (var i = 0; i < elements_by_module[value].length; i++)
		{
			let selector = elements_by_module[value][i];
			btns[selector] = document.getElementById(selector);

			if (btns[selector])
				btns[selector].style.display = 'none';
		}
	}

	// show role specific buttons

	for (var i = 0; i < files_to_load.length; i++)
	{
		var eles = elements_by_module[files_to_load[i]];

		for (var j = 0; j < eles.length; j++)
		{
			let element = btns[eles[j]];

			// element exists
			if (element)
			{
				element.style.display = 'block';

				// if it's a button
				if (element.id.includes("btn_goto_"))
				{
					console.log("id: "+element.id + " " + files_to_load[i]);
					let mod = files_to_load[i];

					// make event
				    element.addEventListener('click',
				        function (){
				            selected_module = mod;
				            show_module (selected_module);
				        }
				    );
				}
			}
		}

	}

	// button events
	set_btn_events();

	/*/ optional


	for (var i = 0; i < files_to_load.length; i++)
	{
		switch (files_to_load[i])
		{

		case files.vehicle_search:
			btn_goto_vehicle_search = document.getElementById('btn_goto_vehicle_search');
			btn_goto_vehicle_search.style.display = "block";
			break;

		case files.vehicle_edit:
			btn_goto_vehicle_edit = document.getElementById('btn_goto_vehicle_edit');
			btn_goto_vehicle_edit.style.display = "block";
			break;

		case files.vehicle_register:
			btn_goto_vehicle_register = document.getElementById('btn_goto_vehicle_register');
			btn_goto_vehicle_register.style.display = "block";
			break;

		// client
		case files.client_search:
			btn_goto_client_search = document.getElementById('btn_goto_client_search');
			btn_goto_client_search.style.display = "block";
			break;

		case files.client_edit:
			btn_goto_client_edit = document.getElementById('btn_goto_client_edit');
			btn_goto_client_edit.style.display = "block";
			break;

		case files.client_register:
			btn_goto_client_register = document.getElementById('btn_goto_client_register');
			btn_goto_client_register.style.display = "block";
			break;

		// payment
		case files.sale:
			btn_goto_sale = document.getElementById('btn_goto_sale');
			btn_goto_sale.style.display = "block";
			break;

		//case files.dialog_picker:

		case files.sale_search:
			btn_goto_sale_search = document.getElementById('btn_goto_sale_search');
			btn_goto_sale_search.style.display = "block";
			break;

		case files.payment:
			btn_goto_payment = document.getElementById('btn_goto_payment');
			btn_goto_payment.style.display = "block";
			break;

		// employee
		case files.employee_search:
			btn_goto_employee_search = document.getElementById('btn_goto_employee_search');
			btn_goto_employee_search.style.display = "block";
			break;

		case files.employee_edit:
			btn_goto_employee_edit = document.getElementById('btn_goto_employee_edit');
			btn_goto_employee_edit.style.display = "block";
			break;

		case files.employee_register:
			btn_goto_employee_register = document.getElementById('btn_goto_employee_register');
			btn_goto_employee_register.style.display = "block";
			break;

		}
	}

	set_btn_events();*/

	/*btn_logout = document.getElementById('btn_logout');
	btn_goto_vehicle_search = document.getElementById('btn_goto_vehicle_search');
	btn_goto_vehicle_edit = document.getElementById('btn_goto_vehicle_edit');
	btn_goto_vehicle_register = document.getElementById('btn_goto_vehicle_register');
	btn_goto_client_search = document.getElementById('btn_goto_client_search');
	btn_goto_client_edit = document.getElementById('btn_goto_client_edit');
	btn_goto_client_register = document.getElementById('btn_goto_client_register');
	btn_goto_sale = document.getElementById('btn_goto_sale');
	btn_goto_payment = document.getElementById('btn_goto_payment');
	btn_goto_sale_search = document.getElementById('btn_goto_sale_search');
	btn_goto_employee_search = document.getElementById('btn_goto_employee_search');
	btn_goto_employee_edit = document.getElementById('btn_goto_employee_edit');
	btn_goto_employee_register = document.getElementById('btn_goto_employee_register');*/

	// get div modules

	module_container = document.getElementById('module_container');

	div_message = document.getElementById("floating_message");
	div_message.style.display = 'none';

	vehicle_search_div    = document.getElementById("module_vehicle_search");
	vehicle_edit_div      = document.getElementById("module_vehicle_edit");
	vehicle_register_div  = document.getElementById("module_vehicle_register");
	client_search_div     = document.getElementById("module_client_search");
	client_edit_div       = document.getElementById("module_client_edit");
	client_register_div   = document.getElementById("module_client_register");
	sale_div              = document.getElementById("module_sale");
	sale_search_div       = document.getElementById("module_sale_search");
	dialog_picker_div     = document.getElementById("module_dialog_picker");
	payment_div           = document.getElementById("module_payment");
	employee_search_div   = document.getElementById("module_employee_search");
	employee_edit_div     = document.getElementById("module_employee_edit");
	employee_register_div = document.getElementById("module_employee_register");

	available_modules['vehicle_search'] =
	vehicle_search_div;
	available_modules['vehicle_edit'] =
	vehicle_edit_div;
	available_modules['vehicle_register'] = vehicle_register_div;
	available_modules['client_search'] = client_search_div;
	available_modules['client_edit'] = client_edit_div;
	available_modules['client_register'] = client_register_div;
	available_modules['sale'] = sale_div;
	//available_modules[7] = dialog;
	available_modules['sale_search'] = sale_search_div;
	available_modules['payment'] = payment_div;
	available_modules['employee_search'] = employee_search_div;
	available_modules['employee_edit'] = employee_edit_div;
	available_modules['employee_register'] = employee_register_div;

	show_message("Bienvenido", "");

	// hidde modules
	vehicle_search_div.style.display   = "none";
	vehicle_edit_div.style.display     = "none";
	vehicle_register_div.style.display = "none";

	client_search_div.style.display   = "none";
	client_edit_div.style.display     = "none";
	client_register_div.style.display = "none";

	sale_div.style.display = "none";
	//dialog_picker_div.style.display = "none"; its display its managed by itself
	sale_search_div.style.display = "none";
	payment_div.style.display = "none";

	employee_search_div.style.display   = "none";
	employee_edit_div.style.display     = "none";
	employee_register_div.style.display = "none";

	// load html
	load_file(files[files_to_load[current_loading_file]]);

	// instanciate
	post_request = create_driver_post_request();
}


