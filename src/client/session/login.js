
import {macro} from '../macro.js';
import {show_message} from '../session_manager.js';
export {create_module_login};

class module_login
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
		value_list.user     = module.tbx_user.value;
		value_list.password = module.tbx_password.value;

    	var postObj = {
    		id: macro.LOGIN,
    		data: value_list
    	};

    	console.log(postObj);

    	module.post_request.request ( postObj,
			function(rows)
			{

				if (rows.data[0].length){
					var userid = rows.data[0][0].id;
					var username = rows.data[0][0].nombres
					var userlastname = rows.data[0][0].apellidos;
					var userrole = rows.data[0][0].role;
					//var userrole = 0;

					if (userid)
					{
						// clear
						module.reset()

						// save cookie
						document.cookie = "userid=" + userid + "; path=/";
						document.cookie = "username=" + username + "; path=/";
						document.cookie = "userlastname=" + userlastname + "; path=/";
						document.cookie = "userrole=" + userrole + "; path=/";

						window.location.replace(window.location.origin+'/index.html');
					}
				}
				else{
                    show_message("Error", "Usuario y/ó constraseña incorrecto.");
					console.log("No")
                }
			}
    	);

	}

}

function create_module_login(post_request)
{
	var module = new module_login();
	module.set_post_request(post_request);
	module.init();

	console.log(module.btn_send);

	module.btn_send.addEventListener('click',
        function(){
        	console.log("press")
        	module_login.authenticate(module);
        }
    );

	return module;
}
