
import {get_siblings} from './utilities/misc.js';
import {create_driver_post_request} from './post_request.js';

import {driver_module_search} from './search/driver.js';
import {create_module_search_vehicle} from './search/vehicle.js';
import {create_module_search_client}  from './search/client.js';

import {driver_module_edit} from './edit/driver.js';
import {create_module_edit_vehicle} from './edit/vehicle.js'
import {create_module_edit_client}  from './edit/client.js'

import {driver_module_register} from './register/driver.js';
import {create_module_register_vehicle} from './register/vehicle.js'
import {create_module_register_client} from './register/client.js'

export {show_module,
		show_message};

// modules

var selected_module = 0;
var available_modules = [];

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

// XHR

var post_request;

var reader = new XMLHttpRequest();

var files_to_load = [
	'./search/vehicle.html',
	'./edit/vehicle.html',
	'./register/vehicle.html',

	'./search/client.html',
	'./edit/client.html',
	'./register/client.html'
	];
var current_loading_file = 0;


// message

var div_message;
var message_timeout;






// wait till fully loaded

document.onreadystatechange = function () {
if (document.readyState == "complete")
{
	init();
}}


// load html files

function load_file(url) {
    reader.open('get', url, true);
    reader.onreadystatechange = read_file;
    reader.send(null);
}

function read_file(){
    if (reader.readyState == 4)
    {

		switch (current_loading_file)
		{

			// vehicle

			// ./search/vehicle.html
			case 0:
				vehicle_search_div.innerHTML = reader.responseText;
		       	vehicle_search = create_module_search_vehicle (post_request);
				break;

			// ./edit/vehicle.html
			case 1:
				vehicle_edit_div.innerHTML = reader.responseText;
		       	vehicle_edit = create_module_edit_vehicle (post_request);
				break;

			// ./register/vehicle.html
			case 2:
				vehicle_register_div.innerHTML = reader.responseText;
		       	vehicle_register = create_module_register_vehicle (post_request);
				break;

			// client

			// ./search/client.html
			case 3:
				client_search_div.innerHTML = reader.responseText;
		       	client_search = create_module_search_client (post_request);
				break;

			// ./edit/client.html
			case 4:
				client_edit_div.innerHTML = reader.responseText;
		       	client_edit = create_module_edit_client (post_request);
				break;

			// ./register/client.html
			case 5:
				client_register_div.innerHTML = reader.responseText;
		       	client_register = create_module_register_client (post_request);
				break;

		}


		// next
		if (current_loading_file < files_to_load.length-1)
		{
			current_loading_file += 1;
			load_file(files_to_load[current_loading_file]);
		}

		// all modules loaded
		else
		{
			// vehicle module
			vehicle_search.set_mod_edit (vehicle_edit);
			vehicle_edit.set_mod_search (vehicle_search);
			vehicle_register.set_mod_search (vehicle_search);

			driver_module_search.fetch_table_list_types (vehicle_search);
			//fetch_data_table_vehicles_with_filter (search_vehicle);


			// client module
			client_search.set_mod_edit (client_edit);
			client_edit.set_mod_search (client_search);
			client_register.set_mod_search (client_search);

			driver_module_search.fetch_table_list_types (client_search);




			// show selected
			show_module (selected_module);
		}

    }
}

function show_module(module_id)
{
	let div_selected_module = available_modules[module_id];
	let siblings = get_siblings(div_selected_module);

	for (var i = 0; i < siblings.length; i++)
	{
		siblings[i].style.display="none";
	}

	div_selected_module.style.display="block";

	/*/ actions on switch module event

	switch(module_id)
	{
		case 1: //edit vehicle module
			driver_module_edit.press_edit_btn_fetch (vehicle_edit);
			break;
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


function init()
{

	// menu buttons
	document.getElementById("btn_goto_vehicle_search").addEventListener('click',
		function (){
			selected_module = 0;
			show_module (selected_module);
		}
	);

	document.getElementById("btn_goto_vehicle_edit").addEventListener('click',
		function (){
			selected_module = 1;
			show_module (selected_module);
		}
	);

	document.getElementById("btn_goto_vehicle_register").addEventListener('click',
		function (){
			selected_module = 2;
			show_module (selected_module);
			driver_module_register.press_reg_btn_fetch (vehicle_register);
		}
	);

	document.getElementById("btn_goto_client_search").addEventListener('click',
		function (){
			selected_module = 3;
			show_module (selected_module);
		}
	);

	document.getElementById("btn_goto_client_edit").addEventListener('click',
		function (){
			selected_module = 4;
			show_module (selected_module);
		}
	);

	document.getElementById("btn_goto_client_register").addEventListener('click',
		function (){
			selected_module = 5;
			show_module (selected_module);
			driver_module_register.press_reg_btn_fetch (client_register);
		}
	);


	// get div modules

	div_message = document.getElementById("floating_message");
	div_message.style.display = 'none';

	vehicle_search_div   = document.getElementById("module_vehicle_search");
	vehicle_edit_div     = document.getElementById("module_vehicle_edit");
	vehicle_register_div = document.getElementById("module_vehicle_register");
	client_search_div    = document.getElementById("module_client_search");
	client_edit_div      = document.getElementById("module_client_edit");
	client_register_div = document.getElementById("module_client_register");

	available_modules[0] = vehicle_search_div;
	available_modules[1] = vehicle_edit_div;
	available_modules[2] = vehicle_register_div;
	available_modules[3] = client_search_div;
	available_modules[4] = client_edit_div;
	available_modules[5] = client_register_div;

	show_message("Bienvenido", "");

	// hidde modules
	vehicle_search_div.style.display   = "none";
	vehicle_edit_div.style.display     = "none";
	vehicle_register_div.style.display = "none";

	client_search_div.style.display   = "none";
	client_edit_div.style.display     = "none";
	client_register_div.style.display = "none";

	// load html
	load_file(files_to_load[current_loading_file]);

	// instanciate
	post_request = create_driver_post_request();
}


