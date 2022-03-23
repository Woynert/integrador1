import {macro} from '../macro.js';
import {module_template} from '../module.js';
import {show_message} from '../index.js';

export {create_module_facture_viewer};

class module_facture_viewer extends module_template
{
	constructor()
	{
		super();
		// vars

		var id_sale;
		var callback;
		var facture = {}; // facture data

		// elements

		var main_viewer;
		var btn_goback;
		var btn_print;

		// shared modules
		var post_request;
	}

	init()
	{
		this.main_viewer = document.getElementById('facture_main_viewer');
		this.btn_goback  = document.getElementById('facture_btn_goback');
		this.btn_print   = document.getElementById('facture_btn_print');
	}

	set_post_request (post_request)
	{
		this.post_request = post_request;
	}

	setup (id_sale, callback)
	{
		this.reset();

		this.id_sale  = id_sale;
		this.callback = callback;
		var myself = this;

		var value_list = {}
		value_list.id_sale = this.id_sale;

		// post request
		var postObj = {
			id: macro.SALE_GET_FACTURE_INFO,
			data: value_list
		}

		this.post_request.request (postObj,
			function(rows)
			{
				if (rows.data){
					myself.facture = rows.data[0][0];
					//console.log(rows.data[0][0]);
					module_facture_viewer.format_and_show(myself);
				}
				else
					show_message("Error", "Hubo un error al realizar la operación.");
			}
		);
	}

	static format_and_show(module)
	{
		console.log('module.facture');
		console.log(module.facture);

		var fct = module.facture;
		var str =
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("CONCESIONARIA BIN CO") +
		module.fmtaddcenter("PRUEBA DE ENTREGA") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Fecha Generación:", fct.created) +
		module.fmtadd("Fecha Pago:", fct.payed) +
		module.fmtadd("Destino:", fct.domicilio) +
		module.fmtadd("Destinatario:", fct.nombres+" "+fct.apellidos) +
		module.fmtadd("CC:", fct.cedula) +
		module.fmtadd("Cajero:", "Concesionaria Bin Co") +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Empresa Proveedora:", fct.responsible) +
		module.fmtadd("Tipo de Vehiculo:", fct.tipo_vehiculo) +
		module.fmtadd("Marca:", fct.marca) +
		module.fmtadd("Modelo:", fct.modelo) +
		module.fmtadd("Condición:", fct.condicion) +
		module.fmtaddcenter(" ") +
		module.fmtaddcenter("---------") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Factura de Venta:", fct.id_sale) +
		module.fmtadd("Subtotal:", fct.subtotal) +
		module.fmtadd("Descuentos:", fct.discount + "%") +
		module.fmtadd("Impuestos:", fct.tax + "%") +
		module.fmtaddcenter(" ") +
		module.fmtadd("Total:", fct.total) +
		module.fmtaddcenter(" ") +
		"";

		module.main_viewer.innerHTML = str;
	}

	fmtadd(str1, str2){
		var str =
		"<div class='facture_fmt_left'>"+str1+"</div>" +
		"<div class='facture_fmt_right'>"+str2+"</div><br>";
		console.log(str);
		return str;
	}

	fmtaddcenter(str1){
		var str="<div class='facture_fmt_center'>"+str1+"</div>";
		return str;
	}

	reset(){
		this.main_viewer.innerHTML = "";
	}
}

function create_module_facture_viewer (post_request)
{
	var module = new module_facture_viewer();
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
