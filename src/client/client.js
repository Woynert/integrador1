
import {get_siblings} from './utilities/misc.js';
import {create_driver_search_vehicle,
		fetch_data_table_vehicles} from './search_vehicle/search.js';
import {create_edit_vehicle} from './edit_vehicle/edit.js';
import {create_driver_post_request} from './post_request.js';

export {show_module};

console.log("Active");

// modules

var selected_module = 1;
var available_modules = [];

var search_vehicle;
var div_search_vehicle;

var edit_vehicle;
var div_edit_vehicle;

// XHR

var post_request;

var reader = new XMLHttpRequest();

var files_to_load = [
	'./search_vehicle/search.html',
	'./edit_vehicle/edit.html',
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
			case 0: // ./search_vehicle/search.html
				div_search_vehicle.innerHTML = reader.responseText;
		       	search_vehicle = create_driver_search_vehicle(post_request);
				break;

			case 1: // ./edit_vehicle/edit.html
				div_edit_vehicle.innerHTML = reader.responseText;
		       	edit_vehicle = create_edit_vehicle(search_vehicle, post_request);
				//console.log(search_vehicle);
				break;
		}

		if (current_loading_file < files_to_load.length-1)
		{
			current_loading_file += 1;
			load_file(files_to_load[current_loading_file]);
		}

		// all modules loaded
		else
		{
			search_vehicle.set_mod_edit(edit_vehicle);

			fetch_data_table_vehicles(search_vehicle);
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

}

function show_message(title, text)
{

	// make visible
	div_message.style.display = 'block';

	div_message.getElementsByTagName('b')[0].innerHTML = title;
	div_message.getElementsByTagName('p')[0].innerHTML = text;

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
	document.getElementById("btn_goto_search").addEventListener('click',
		function (){
			selected_module = 0;
			show_module (selected_module);
		}
	);

	document.getElementById("btn_goto_edit").addEventListener('click',
		function (){
			selected_module = 1;
			show_module (selected_module);
		}
	);

	// get div modules

	div_message = document.getElementById("floating_message");
	div_message.style.display = 'none';

	div_search_vehicle = document.getElementById("mod_search_vehicle");
	div_edit_vehicle   = document.getElementById("mod_edit_vehicle");

	available_modules[0] = div_search_vehicle;
	available_modules[1] = div_edit_vehicle;


	show_message("Bienvenido", "");

	// hidde modules
	//div_search_vehicle.style.display="none";
	//div_edit_vehicle.style.display="none";

	// show selected
	show_module (selected_module);

	// load html
	load_file(files_to_load[current_loading_file]);

	// instanciate
	//post_request = new driver_post_request();
	post_request = create_driver_post_request();
	//search_vehicle = new mod_search_vehicle(post_request);
}


