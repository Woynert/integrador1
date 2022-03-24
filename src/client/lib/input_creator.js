export {input_creator};

class input_creator
{
	constructor()
	{}

	create (id, ele)
	{
		let input;

		if (!ele){
			console.log("Input_creator: Element not found.");
			return;
		}

		switch(id)
		{
			// string
			default:
				input = new Cleave(ele, {
				});
				break;

			// numerical
			case 1:
				input = new Cleave(ele, {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralPositiveOnly: true
                });
                break;

			// date
			case 2:
				input = new Cleave(ele, {
                    date: true,
                    datePattern: ['Y', 'm', 'd'],
                    delimiter: '-'
                });
				break;

		}

		// attach cleave to the input
		ele.id_input = id;
		ele.cleave = input;

		return input;
	}

	get_value (ele)
	{
		// date
		if (ele.id_input == 2)
			return ele.cleave.getFormattedValue();
		else
			return ele.cleave.getRawValue();
	}

	is_empty (ele)
	{
		let empty;
		let value = ele.cleave.getRawValue();

		value = value.replace(/ /g, "");

		if (ele.cleave.properties.date)
		{
			empty = (value.length < 8)
		}
		else
			empty = (value == '')

		return empty;

	}

	pass_strength_check (password)
	{
		var strong_regex =
		new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

		var pass = strong_regex.test (password);

		if (pass)
			console.log('pass');
		else
			console.log('does not pass');

		return pass;

	}
}



