
import mariadb from 'mariadb/callback.js';

export {dbconn};

const server_data = {
	host: '127.0.0.1',
	port: 12345,
	database: 'integrador',
	user: 'reider',
	password: 'upbbga'
};

class dbconn
{
	constructor()
	{
		this.conn = null;
	}

	start_connection()
	{
		this.conn = mariadb.createConnection(server_data);

		this.conn.connect(err => {
		  if (err) {
		    console.log("not connected due to error: " + err);
		  } else {
		    console.log("connected ! connection id is " + conn.threadId);
		  }
		});
	}

	print_query(sql_query, callback, res, id)
	{
		this.conn.query(sql_query, (err, rows, meta) => {
			if (err)
				console.log(err);
				//throw err;

			callback(rows, res, id); // call function
		});
	}

	end_connection()
	{
		this.conn.end();
	}
}
