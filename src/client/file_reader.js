
var reader = new XMLHttpRequest();
var loadingfile = './search_vehicle/search.html';

function loadFile(url) {
    reader.open('get', url, true);
    reader.onreadystatechange = read_file;
    reader.send(null);
}

function read_file(){
	if (reader.readyState == 4)
	{
		console.log(reader.responseText)
	}
}

