
import {macro} from '../macro.js';
import {show_message} from '../static_manager.js';
export {create_module_contact};

class module_contact
{
	constructor()
	{

		// elements
		this.tbx_user;
		this.tbx_password;
		this.btn_send;

		// shared modules
		this.post_request;

	}

	init()
	{
		this.tbx_user     = document.getElementById('login_tbx_user');
		this.tbx_password = document.getElementById('login_tbx_password');
		this.btn_send     = document.getElementById('login_btn_send');
	}

	set_post_request(post_request)
	{
		this.post_request = post_request;
	}

	reset ()
	{
		this.tbx_user.value = '';
		this.tbx_password.value = '';
	}

	static authenticate (module)
	{

		var value_list = {};
		value_list.mail    = module.tbx_user.value;
		value_list.message = module.tbx_password.value;

		if ((value_list.mail == "") || (value_list.message == ""))
		{
			show_message("Alerta", "Completa todos los campos.");
			return;
		}

    	var postObj = {
    		id: macro.CONTACT,
    		data: value_list
    	};

    	console.log(postObj);

    	module.post_request.request ( postObj,
			function(rows)
			{

				if (rows.data){
					show_message("Exito", "Te contactaremos pronto.")
				}
				else{
                    show_message("Error", "Usuario y/ó constraseña incorrecto.");
					console.log("No")
                }
			}
    	);

	}

}

function create_module_contact(post_request)
{
	var module = new module_contact();
	module.set_post_request(post_request);
	module.init();

	console.log(module.btn_send);

	module.btn_send.addEventListener('click',
        function(){
        	console.log("press")
        	module_contact.authenticate(module);
        }
    );

	return module;
}
