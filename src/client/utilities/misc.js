
export {get_siblings};

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


