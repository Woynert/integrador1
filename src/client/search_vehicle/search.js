
//import {driver_post_request} from '../post_request.js';


// globals

class mod_search_vehicle
{
	constructor()
	{
		// vars

		this.self_reference;

		this.data_rows;
		this.post_request; // = post_request;

		//console.log(this.post_request);

		// DOM elements

		this.tbl_vehicles;
		this.tbl_resume;
	}

	/*handle_data_table_vehicles(data)
	{
		console.log("Me llego esto");
		console.log(data);
	}*/


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
		//console.log(rows)
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
					/*console.log(tr);
					console.log(myself);
					console.log("aboice");*/
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


	/*fetch_data_table_vehicles()
	{
		let postObj = {
		    id: 1
		}

		console.log(this.mod_search.post_request);

		// call fetch object
		//this.mod_search.post_request.request(postObj, this.mod_search.handle_data_table_vehicles);
		this.mod_search.post_request.request(postObj,
			function(data)
			{
				this.mod_search.handle_data_table_vehicles(data);
				//console.log("MM")
				//console.log(data)
			}
		);
	}*/


	/*// create table headers

	populate_table_header (rows)
	{
		var tr;
		var td;

		// headers

		tr = document.createElement('tr');

		for (value in rows[0])
		{
			td = document.createElement('td');
			td.innerHTML = value;
			tr.appendChild(td);
		}

		tbl_vehicles.appendChild(tr);
	}

	// show data on table

	populate_table (rows)
	{
		console.log(rows)
		var tr;
		var td;

		// rows

		for (i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			for (value in rows[i])
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
					console.log(this);
					row_click(evt.currentTarget, this.mod_search);
				}
			);
			tbl_vehicles.appendChild(tr);
		}

	}*/

	// populate resume table with item values




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
		//driver.mod_search.handle_data_table_vehicles(data);
		console.log("MM")

		// clear

        driver.mod_search.tbl_vehicles.innerHTML = "";
        driver.mod_search.tbl_resume.innerHTML = "";

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

	console.log(ms);

	// select

	//var tr = evt.currentTarget;
	var tr = target;
	tr.classList.add("selected");

	// deselect siblings

	var siblings = getSiblings(tr);

	for (var i = 0; i < siblings.length; i++)
	{
		siblings[i].classList.remove("selected");
	}

	// populate

	console.log(tr);
	console.log(parseInt(tr.firstChild.innerHTML)-1);

	ms.populate_resumen (ms.data_rows[parseInt(tr.firstChild.innerHTML)-1]);
}



function getSiblings (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};

export {driver_search_vehicle, getSiblings, create_driver_search_vehicle};


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
