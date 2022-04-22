
import {get_siblings,
        get_cookie,
        delete_cookie} from './utilities/misc.js';
import {create_driver_post_request} from './post_request.js';

import {create_module_contact}  from './static/contact.js';
//import {create_module_password_recovery}   from './search/client.js';


export {show_module,
		show_message};

// modules

var selected_module = 0; // start on ventas by default
var available_modules = [];
var module_container;

// vehicle

var login;
var login_div;

var password_recovery;
var password_recovery_div;

// message

var div_message;
var message_timeout;

// XHR

var post_request;

var reader = new XMLHttpRequest();

var files_to_load = [
	'./static/contact.html'
	// './edit/vehicle.html'
	];
var current_loading_file = 0;



// wait till fully loaded

document.onreadystatechange = function () {
if (document.readyState == "complete")
{
	var userrole = get_cookie("userrole");

    // already loged in -> go back to home
    if (userrole)
    {
		console.log (userrole);
        window.location.replace(window.location.origin + "/index.html");
        return;
    }

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

			// ./session/login.html
			case 0:
				console.log("Hello?");
				login_div.innerHTML = reader.responseText;
		       	login = create_module_contact (post_request);
		       	console.log(login)
				break;

			/*/ ./session/password_recovery.html
			case 1:
				employee_register_div.innerHTML = reader.responseText;
		       	employee_register = create_module_register_employee (post_request);
				break;*/
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
	document.getElementById("btn_goto_login").addEventListener('click',
		function (){
			selected_module = 0;
			show_module (selected_module);
		}
	);

	/*document.getElementById("btn_goto_vehicle_edit").addEventListener('click',
		function (){
			selected_module = 1;
			show_module (selected_module);
		}
	);*/



	// get div modules

	module_container = document.getElementById('module_container');

	div_message = document.getElementById("floating_message");
	div_message.style.display = 'none';

	login_div    = document.getElementById("module_login");

	available_modules[0] = login_div;


	// hidde modules
	login_div.style.display   = "none";

	// load html
	load_file(files_to_load[current_loading_file]);

	// instanciate
	post_request = create_driver_post_request();
}


