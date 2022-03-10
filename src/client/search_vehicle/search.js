
import {get_siblings} from '../utilities/misc.js';
import {show_module} from '../client.js';
import {press_edit_btn_fetch} from '../edit_vehicle/edit.js';
import {press_reg_btn_fetch} from '../register_vehicle/register.js';

export {create_driver_search_vehicle,
		fetch_data_table_vehicles,
		fetch_data_table_vehicles_tipos};


// globals

class mod_search_vehicle
{
	constructor()
	{
		// vars

		this.selected_row = -1;
		this.data_rows;
		this.data_rows_tipos;
		this.post_request;

		// DOM elements

		this.tbl_vehicles;
		this.tbl_vehicles_filter;
		this.tbl_resume;
		this.btn_edit_row;

		// shared modules
		this.mod_edit;
		this.mod_register;
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

		this.tbl_vehicles.appendChild(tr);
	}

	// show data on table

	populate_table ()
	{
		let rows = this.data_rows;
		var tr;
		var td;

		var myself = this;

		var first_tr = null;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			if (first_tr == null)
			{
				first_tr = tr;
			}

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
			this.tbl_vehicles.appendChild(tr);
		}

		return first_tr;

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
			this.tbl_resume.appendChild(tr);
		}

	}

	populate_filter_form ()
	{
		let rows = this.data_rows_tipos;
		var tr;
		var td;
		var input;

		var myself = this;

		// rows

		for (var i = 0; i < rows.length; i++)
		{

			tr = document.createElement('tr');

			for (var value in rows[i])
			{

				td = document.createElement('td');

				if (value == "tipo")
				{
					// create respective input

					input = document.createElement('input');

					switch (rows[i][value])
					{
						case 0: // string
							input.type = "text";
							break;

						case 1: // int
							input.type = "number";
							break;

						case 2: // date
							input.type = "date";
							break;
					}

					td.appendChild(input);
				}

				else
				{
					td.innerHTML = rows[i][value];
				}

				tr.appendChild(td);


			}

			// add mouse event
			/*tr.classList.add("row_item");
			tr.addEventListener('click',
				function()
				{
					row_click (this, myself);
				}
			);*/

			this.tbl_vehicles_filter.appendChild(tr);
		}

		//return first_tr;
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

		this.mod_search.tbl_vehicles = document.getElementById ("srh_tbl_vehicles");
		this.mod_search.tbl_vehicles_filter = document.getElementById ("srh_tbl_vehicles_filter");
		this.mod_search.tbl_resume   = document.getElementById ("srh_tbl_resume");
		this.mod_search.btn_edit_row = document.getElementById ("srh_btn_edit_row");
	}

	get_data_rows()
	{
		return this.mod_search.data_rows;
	}

	get_selected_row()
	{
		return this.mod_search.selected_row;
	}

	set_mod_edit(mod_edit){
		this.mod_search.mod_edit = mod_edit;
	}

	set_mod_register(mod_register){
		this.mod_search.mod_register = mod_register;
	}

}

function create_driver_search_vehicle(post_request)
{
	var driver = new driver_search_vehicle(post_request);

	// set event listeners

	document.getElementById("srh_btn_filter").addEventListener('click',
		function(){
			fetch_data_table_vehicles_with_filter(driver);
		}
	);

	document.getElementById("srh_btn_fetch").addEventListener('click',
		function(){
			fetch_data_table_vehicles(driver);
		}
	);

	document.getElementById("srh_btn_edit_row").addEventListener('click',
		function(){

			//driver.mod_search.mod_edit

			if (driver.mod_search.mod_edit){
				show_module(1);
				press_edit_btn_fetch(driver.mod_search.mod_edit);
			}
		}
	);

	driver.init();

	return driver;
}


function fetch_data_table_vehicles_with_filter(driver)
{
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

        // populate

        driver.mod_search.data_rows = rows.data;
        driver.mod_search.populate_table_header ();
        var first_tr = driver.mod_search.populate_table ();

		// select the first one

        if (rows.data.length > 0)
        {
        	driver.mod_search.selected_row = 0;
        	row_click (first_tr, driver.mod_search);

	        // tell everione
	        //driver.mod_search.mod_edit();

	        press_reg_btn_fetch (driver.mod_search.mod_register);

        }
	}
	);
}

function fetch_data_table_vehicles_tipos(driver)
{
	let postObj = {
	    id: 4
	}

	// call fetch object
	driver.mod_search.post_request.request(postObj,
	function(rows)
	{

        driver.mod_search.data_rows_tipos = rows.data;
		driver.mod_search.populate_filter_form ();

        /*/ populate

        driver.mod_search.populate_table_header ();
        var first_tr = driver.mod_search.populate_table ();

		// select the first one

        if (rows.data.length > 0)
        {
        	driver.mod_search.selected_row = 0;
        	row_click (first_tr, driver.mod_search);

	        // tell everione
	        //driver.mod_search.mod_edit();

	        press_reg_btn_fetch (driver.mod_search.mod_register);

        }*/
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
