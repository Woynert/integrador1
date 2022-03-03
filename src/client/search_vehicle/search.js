
import {get_siblings} from '../utilities/misc.js';

export {create_driver_search_vehicle,
		fetch_data_table_vehicles};

/*export {driver_search_vehicle,
        getSiblings,
        create_driver_search_vehicle};*/

// globals

class mod_search_vehicle
{
	constructor()
	{
		// vars

		this.selected_row = -1;
		this.data_rows;
		this.post_request;

		// DOM elements

		this.tbl_vehicles;
		this.tbl_resume;
	}

	// create table headers

	populate_table_header ()
	{
		let rows = this.data_rows;
		var tr;
		var td;

		// headers

		tr = document.createElement('tr');

		for (var value in rows[0])
		{
			td = document.createElement('td');
			td.innerHTML = value;
			tr.appendChild(td);
		}

		tbl_vehicles.appendChild(tr);
	}

	// show data on table

	populate_table ()
	{
		let rows = this.data_rows;
		var tr;
		var td;

		var myself = this;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			for (var value in rows[i])
			{

				td = document.createElement('td');
				td.innerHTML = rows[i][value];
				tr.appendChild(td);

			}

			// add mouse event
			tr.classList.add("row_item");
			tr.addEventListener('click',
				function()
				{
					row_click (this, myself);
				}
			);
			tbl_vehicles.appendChild(tr);
		}

	}


	populate_resumen (item)
	{

		// clear

		this.tbl_resume.innerHTML = "";

		// populate

		var tr;
		var td;

		for (var value in item)
		{

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("resumen_key");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = item[value];
			tr.appendChild(td);

			// append to resume table
			tbl_resume.appendChild(tr);
		}

	}

}


class driver_search_vehicle
{

	constructor(post_request)
	{
		this.mod_search = new mod_search_vehicle();
		this.mod_search.post_request = post_request;
	}

	// initialize

	init ()
	{
		// get elements

		this.mod_search.tbl_vehicles = document.getElementById ("tbl_vehicles");
		this.mod_search.tbl_resume   = document.getElementById ("tbl_resume");
	}

	get_data_rows()
	{
		return this.mod_search.data_rows;
	}

	get_selected_row()
	{
		return this.mod_search.selected_row;
	}

}

function create_driver_search_vehicle(post_request)
{
	var driver = new driver_search_vehicle(post_request);

	// set event listeners

	document.getElementById("btn_fetch").addEventListener('click',
		function(){
			fetch_data_table_vehicles(driver);
		}
	);

	driver.init();

	return driver;
}



function fetch_data_table_vehicles(driver)
{
	let postObj = {
	    id: 1
	}

	// call fetch object
	driver.mod_search.post_request.request(postObj,
	function(rows)
	{
		// clear

        driver.mod_search.tbl_vehicles.innerHTML = "";
        driver.mod_search.tbl_resume.innerHTML = "";
        driver.mod_search.selected_row = rows.data.length -1;

        // populate

        driver.mod_search.data_rows = rows.data;
        driver.mod_search.populate_table_header ();
        driver.mod_search.populate_table ();

	}
	);
}



// row click event

function row_click (target, ms)
{

	var tr = target;
	tr.classList.add("selected");

	// deselect siblings

	var siblings = get_siblings(tr);

	for (var i = 0; i < siblings.length; i++)
	{
		siblings[i].classList.remove("selected");
	}

	// populate

	ms.selected_row = parseInt(tr.firstChild.innerHTML) - 1;

	ms.populate_resumen (ms.data_rows [ms.selected_row]);
}








/*/ DATABASE COMMUNICATION

console.log("active")

const url = "/endpoint"
let xhr = new XMLHttpRequest()

// solicitar tabla vehicles

function fetch_table_vehicles()
{
	let postObj = {
	    id: 1
	}

	var post = JSON.stringify(postObj)

	xhr.open('POST', url, true)
	xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
	xhr.send(post);
}


// GET DATA

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200)
    {
    	var rows = JSON.parse(xhr.responseText);
		var id   = rows.id_pkg

		console.log(rows)
    	console.log("Recibido pkg " + id)
    	console.log(rows.id_pkg)

    	switch(id)
    	{
			case 1: // tabla vehicles

				// clear

				tbl_vehicles.innerHTML = "";
				tbl_resume.innerHTML = "";

				// populate

				data_rows = rows.data;
				populate_table_header (data_rows);
				populate_table (data_rows);

				break;
    	}

    }
}

*/
