// DATABASE COMMUNICATION

console.log("active");

export {driver_post_request, create_driver_post_request};




class mod_post_request
{
	constructor()
	{
		this.url = "/endpoint";
		this.xhr = new XMLHttpRequest();
		this.callback_pool = {};

		// GET DATA

		//this.xhr.onreadystatechange = this.handle_data();
	}

	// GET DATA

	handle_data () {
	    if (this.xhr.readyState == 4 && this.xhr.status == 200)
	    {
	    	var rows = JSON.parse(this.xhr.responseText);
			var id   = rows.id_pkg

			console.log(rows)
	    	console.log("Recibido pkg " + id)

			// callback

			this.callback_pool[id](rows);
			delete this.callback_pool[id];
		}
	}
}

class driver_post_request
{

	constructor()
	{
		this.post_request = new mod_post_request();
	}

	/* solicitar tabla vehicles
		data     : json {conn_id, query_id, data}
		callback : function (data)
	*/
	request (dataObj, callback)
	{

		let pr = this.post_request;

		// save callback
		console.log("Makin a request with id " + dataObj.id);
		pr.callback_pool[dataObj.id] = callback;

		// format data
		var post = JSON.stringify(dataObj);

		pr.xhr.open ('POST', pr.url, true);
		pr.xhr.setRequestHeader ('Content-type', 'application/json; charset=UTF-8');
		pr.xhr.send (post);

	}

}

function create_driver_post_request()
{
	var driver = new driver_post_request();

	// events

	driver.post_request.xhr.onreadystatechange = function()
	{
		driver.post_request.handle_data();
	}

	return driver;
}

