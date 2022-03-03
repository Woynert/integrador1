
export {create_edit_vehicle};

class mod_edit_vehicle
{
	constructor(search_vehicle)
	{
		this.id = -1;
		this.item;
		this.search_vehicle = search_vehicle;

		this.tbl_properties;
	}

	init()
	{
		// get elements

		this.tbl_properties = document.getElementById ("edit_tbl_vehicle_properties");
		//this.mod_search.tbl_resume   = document.getElementById ("tbl_resume");
	}


	get_item_from_row()
	{

		// get from search module

		var rows = this.search_vehicle.get_data_rows();

		this.item = rows[this.id];
		console.log(this.item)

	}

	populate_table_properties ()
	{
		// clear

		this.tbl_properties.innerHTML = "";

		// populate

		var tr;
		var td;
		var input;

		for (var value in this.item)
		{

			tr = document.createElement('tr');

			td = document.createElement('td');
			td.classList.add("myprp");
			td.innerHTML = value;
			tr.appendChild(td);

			td = document.createElement('td');

			input = document.createElement('input');
			input.type = "text";
			input.value = this.item[value];
			td.appendChild(input);
			tr.appendChild(td);

			// append to resume table
			this.tbl_properties.appendChild(tr);
		}
	}
}


function create_edit_vehicle(search_vehicle)
{
	var edit = new mod_edit_vehicle(search_vehicle);

	// buttons
	document.getElementById("edit_btn_fetch").addEventListener('click',
		function(){

			edit.id = edit.search_vehicle.get_selected_row();

			// check it has something selected

			if (edit.id >= 0)
			{
				console.log("Editing row # " + edit.id);

				edit.get_item_from_row();

				edit.populate_table_properties();
			}

		}
	);

	edit.init();
	return edit;
}
