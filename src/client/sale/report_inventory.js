import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {show_message} from '../index.js';

export {create_module_report_inventory_viewer};

class module_report_inventory_viewer extends module_template
{
	constructor()
	{
		super();
		// vars

		var id_sale;
		var callback;
		var data = {}; // facture data

		// elements

		var main_viewer;
		var btn_goback;
		var btn_print;

		// shared modules
		var post_request;
	}

	init()
	{
		this.main_viewer = document.getElementById('report_inventory_main_viewer');
		this.btn_goback  = document.getElementById('report_inventory_btn_goback');
		this.btn_print   = document.getElementById('report_inventory_btn_print');
	}

	set_post_request (post_request)
	{
		this.post_request = post_request;
	}

	setup (callback)
	{
		this.reset();

		this.callback = callback;
		var myself = this;

		var value_list = {}

		// post request
		var postObj = {
			id: macro.REPORT_INVENTORY,
			data: value_list
		}

		this.post_request.request (postObj,
			function(rows)
			{
				if (rows.data){
					myself.data = rows.data;
					//console.log(rows.data[0][0]);
					module_report_inventory_viewer.format_and_show(myself);
				}
				else
					show_message("Error", "Hubo un error al realizar la operación.");
			}
		);
	}

	static format_and_show(module)
	{
		console.log('module.report_inventory');
		console.log(module.data);

		// get date
		let current = new Date();
		let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
		let cTime = current.toLocaleTimeString("en-US");
		let date_time = cDate + ' ' + cTime;

		var da = module.data;
		var str =
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("CONCESIONARIA CONBIN") +
		module.fmtaddcenter("REPORTE DE INVENTARIO") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ");
		var marca = "";
		for (var i = 0; i < da[0].length; i++)
		{
			if (marca != da[0][i].marca)
			{
				marca = da[0][i].marca;

				if (i != 0)
					str += "</table>";

				str +=
				module.fmtaddcenter(" ") +
				module.fmtaddcenter(" ") +
				module.fmtaddcenter("EMPRESA " + marca.toUpperCase()) +
				module.fmtaddcenter(" ");

				str +=
				"<table><tr><td>LOCALID</td>" +
				"<td>TIPO</td>" +
				"<td>MODELO</td>" +
				"<td>GENERACIÓN</td>" +
				"<td>CONDICIÓN</td>" +
				"<td>PRECIO</td>" +
				"<td>CANTIDAD</td></tr>";

			}

			str += "<tr>";
			str += "<td>"+da[0][i].id_from_marca+"</td>";
			str += "<td>"+da[0][i].tipo_vehiculo+"</td>";
			str += "<td>"+da[0][i].modelo+"</td>";
			str += "<td>"+da[0][i].generacion+"</td>";
			str += "<td>"+da[0][i].condicion+"</td>";
			str += "<td>"+da[0][i].precio+"</td>";
			str += "<td>"+da[0][i].cantidad+"</td>";
			str += "</tr>";
		}
		str +=
		"</table>" +
		module.fmtaddcenter(" ")+
		module.fmtaddcenter(" ")+
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ")+
		module.fmtaddcenter("GENERADO EN")+
		module.fmtaddcenter(date_time)+
		module.fmtaddcenter(" ")+
		module.fmtaddcenter(" ") +
		"";

		module.main_viewer.innerHTML = str;
	}

	fmtadd(str1, str2){
		var str =
		"<div class='report_inventory_fmt_left'>"+str1+"</div>" +
		"<div class='report_inventory_fmt_right'>"+str2+"</div><br>";
		console.log(str);
		return str;
	}

	fmtaddcenter(str1){
		var str="<div class='report_inventory_fmt_center'>"+str1+"</div>";
		return str;
	}

	reset(){
		this.main_viewer.innerHTML = "";
	}
}

function create_module_report_inventory_viewer (post_request)
{
	var module = new module_report_inventory_viewer();
	module.set_post_request(post_request);
	module.init();

	module.btn_goback.addEventListener('click',
        function(){
        	module.callback();
        }
    );

	module.btn_print.addEventListener('click',
        function(){
        	console.log ('print my life');
	       	module.main_viewer.classList.add("print_div");
	       	console.log(module.main_viewer.classList);
			window.print ();
        	// module.main_viewer.classList.remove("print_div");
        }
    );

	return module;
}
