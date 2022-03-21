
export {get_siblings,
		get_cookie,
		delete_cookie};

function get_siblings (elem) {

	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// loop siblings except me
	while (sibling)
	{
		if (sibling.nodeType === 1 && sibling !== elem)
		{
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};


function get_cookie(cname)
{
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');

	for(let i = 0; i <ca.length; i++)
	{
		let c = ca[i];

		while (c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0)
		{
			return c.substring(name.length, c.length);
		}
	}

	return "";
}


function delete_cookie (name, path, domain)
{
	if (get_cookie( name ))
	{
		document.cookie =
			name + "=" +
			((path) ? ";path="+path:"")+
			((domain)?";domain="+domain:"") +
			";expires=Thu, 01 Jan 1970 00:00:01 GMT";
	}
}
