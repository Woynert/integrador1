import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {show_message} from '../index.js';

export {create_module_report_money_viewer};

class module_report_money_viewer extends module_template
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
		this.main_viewer = document.getElementById('report_money_main_viewer');
		this.btn_goback  = document.getElementById('report_money_btn_goback');
		this.btn_print   = document.getElementById('report_money_btn_print');
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
			id: macro.REPORT_MONEY,
			data: value_list
		}

		this.post_request.request (postObj,
			function(rows)
			{
				if (rows.data){
					myself.data = rows.data;
					//console.log(rows.data[0][0]);
					module_report_money_viewer.format_and_show(myself);
				}
				else
					show_message("Error", "Hubo un error al realizar la operación.");
			}
		);
	}

	static format_and_show(module)
	{
		console.log('module.report_money');
		console.log(module.data);

		var da = module.data;
		var str =
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("CONCESIONARIA BIN CO") +
		module.fmtaddcenter("REPORTE MONETARIO") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Ganancias: "+ da[0][0].ganancias,'') +
		module.fmtadd("Perdidas: "+ da[0][0].perdidas,'') +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Cuentas por pagar TOTAL: "+ da[1][0].por_pagar,'') +
		module.fmtadd("Cuentas por cobrar TOTAL: "+ da[1][0].por_cobrar,'') +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("Ventas realizadas") +
		"<table> <tr><td>ID</td><td>FECHA DE PAGO</td><td>VALOR</td></tr>";
		for (var i = 0; i < da[2].length; i++)
		{
			str += "<tr>";
			str += "<td>"+da[2][i].ID+"</td>";
			str += "<td>"+da[2][i].payed+"</td>";
			str += "<td>"+da[2][i].total+"</td>";
			str += "</tr>";
		}
		str +=
		"</table>" +
		module.fmtaddcenter("---------") +
		module.fmtaddcenter("Ventas pendientes") +
		module.fmtaddcenter(" ")+
		"<table> <tr><td>ID</td><td>FECHA DE CREACIÓN</td><td>VALOR</td></tr>";
		for (var i = 0; i < da[3].length; i++)
		{
			str += "<tr>";
			str += "<td>"+da[3][i].ID+"</td>";
			str += "<td>"+da[3][i].created+"</td>";
			str += "<td>"+da[3][i].total+"</td>";
			str += "</tr>";
		}
		str +=
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		"";

		module.main_viewer.innerHTML = str;
	}

	fmtadd(str1, str2){
		var str =
		"<div class='report_money_fmt_left'>"+str1+"</div>" +
		"<div class='report_money_fmt_right'>"+str2+"</div><br>";
		console.log(str);
		return str;
	}

	fmtaddcenter(str1){
		var str="<div class='report_money_fmt_center'>"+str1+"</div>";
		return str;
	}

	reset(){
		this.main_viewer.innerHTML = "";
	}
}

function create_module_report_money_viewer (post_request)
{
	var module = new module_report_money_viewer();
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
        	//module.main_viewer.classList.remove("print_div");
        }
    );

	return module;
}
