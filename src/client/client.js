import {create_driver_search_vehicle} from './search_vehicle/search.js';
import {create_driver_post_request} from './post_request.js';

console.log("Active");

// objects

var search_vehicle;
var div_search_vehicle;

// XHR

var post_request;

var reader = new XMLHttpRequest();
var current_file = './search_vehicle/search.html';


// check document is loaded

document.onreadystatechange = function () {
if (document.readyState == "complete")
{
	init();
}}


// load html files

function loadFile(url) {
    reader.open('get', url, true);
    reader.onreadystatechange = read_file;
    reader.send(null);
}

function read_file(){
    if (reader.readyState == 4)
    {
        console.log(reader.responseText);

        // search vehicle

        div_search_vehicle.innerHTML = reader.responseText;

       	search_vehicle = create_driver_search_vehicle(post_request);

		console.log(search_vehicle);

        //search_vehicle.init();
        //search_vehicle.init(search_vehicle);
    }
}



function init()
{
	// get div modules
	div_search_vehicle = document.getElementById("mod_search_vehicles");

	// load html
	loadFile(current_file);

	// instanciate
	//post_request = new driver_post_request();
	post_request = create_driver_post_request();
	//search_vehicle = new mod_search_vehicle(post_request);
}

