
import {module_template} from '../module.js';
import {driver_module_search} from '../search/driver.js';

export {create_dialog_picker};

class dialog_picker extends module_template
{
	constructor()
	{
		super();

		// vars
		this.module_contained;
		this.module_origin;
		this.callback;

		// dom elements
		this.dom_container;
        this.dom_header;
		this.dom_module_container;
        this.dom_footer;

        this.dom_btn_confirm;
        this.dom_btn_cancel;

	}

	init ()
	{
		this.dom_container = document.getElementById("module_dialog_picker"); //index.html
        this.dom_header = document.getElementById("dialog_header");
		this.dom_module_container = document.getElementById("dialog_module_container");
        this.dom_footer = document.getElementById("dialog_footer");

        this.dom_btn_confirm = document.getElementById("dialog_btn_confirm");
        this.dom_btn_cancel = document.getElementById("dialog_btn_cancel");

		// hide

        this.dom_container.style.display = "none";
	}

	setup (title, module_contained, module_origin, callback)
	{

		// make visible

		this.dom_container.style.display = "block";

		this.module_origin    = module_origin;
		this.module_contained = module_contained;
		this.callback = callback;

		this.dom_header.innerHTML = title;

		// move module

		driver_module_search.toggle_dialog_mode (
            module_contained,
            true,
            this.dom_module_container
        );
	}

	cancel ()
	{
		// make invisible
		this.dom_container.style.display = "none";

		// return module
		driver_module_search.toggle_dialog_mode (
			this.module_contained,
			false,
			null
		);

		// clean

		if (this.callback)
			this.callback(this.module_origin, null);
	}

	confirm ()
	{
		var selected = this.module_contained.get_selected_row();

		if (selected != null)
		{
			// make invisible
			this.dom_container.style.display = "none";

			// return module
			driver_module_search.toggle_dialog_mode (
				this.module_contained,
				false,
				null
			);

			// clean
			if (this.callback)
				this.callback(this.module_origin, selected);
		}
		else
		{
			console.log ("Please select an item.");
		}
	}
}

function create_dialog_picker()
{
	var dialog = new dialog_picker();
	dialog.init();

    dialog.dom_btn_confirm.addEventListener('click',
        function(){
        	dialog.confirm();
        }
    );

    dialog.dom_btn_cancel.addEventListener('click',
        function(){
        	dialog.cancel();
        }
    );

	return dialog;

}
