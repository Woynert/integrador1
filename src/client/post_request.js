// DATABASE COMMUNICATION


export {driver_post_request, create_driver_post_request};


class mod_post_request
{
	constructor()
	{
		this.url = "/endpoint";
		this.xhr = new XMLHttpRequest();
		this.callback_pool = {};


		// request pool
		this.request_pool = [];
		this.busy = false;


		// GET DATA

		//this.xhr.onreadystatechange = this.handle_data();
	}

	// GET DATA

	handle_data () {
	    if (this.xhr.readyState == 4 && this.xhr.status == 200)
	    {
	    	var rows = JSON.parse(this.xhr.responseText);
			var id   = rows.id_pkg

	    	console.log("Recibido pkg " + id,rows);

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

		if (this.post_request.busy)
		{
			this.queue (dataObj, callback);
		}

		// available
		else
		{

			let pr = this.post_request;

			// save callback
			console.log("Making request id " + dataObj.id);
			pr.callback_pool[dataObj.id] = callback;

			// format data
			var post = JSON.stringify(dataObj);

			pr.xhr.open ('POST', pr.url, true);
			pr.xhr.setRequestHeader ('Content-type', 'application/json; charset=UTF-8');
			pr.xhr.send (post);

			// no longer available
			this.post_request.busy = true;
		}

	}

	queue (dataObj, callback)
	{
		var request = {};

		request["dataObj"]  = dataObj;
		request["callback"] = callback;

		this.post_request.request_pool.push(request);
	}


	// finished. But we don't know if it succeeded or not

	load_end( e)
	{
		console.log("Transfer finished.");

		this.post_request.busy = false;

		// check pending requests in queue

		if (this.post_request.request_pool.length)
		{
			var request  = this.post_request.request_pool[0];
			var dataObj  = request["dataObj"];
			var callback = request["callback"];

			// make request

			this.request (dataObj, callback);

			// remove from queue

			this.post_request.request_pool.splice(0,1);
		}

	}

}

function create_driver_post_request()
{
	var driver = new driver_post_request();

	// events

	driver.post_request.xhr.addEventListener ("loadend",
		function ()
		{
			driver.load_end();
		}
	);

	driver.post_request.xhr.onreadystatechange = function()
	{
		driver.post_request.handle_data();
	}

	return driver;
}

