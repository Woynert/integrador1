
export {macro};

/*
 * This file
 * (/src/client/macro.js)
 *
 * needs to be syncronized with
 * The file (/src/server/macro.js)
 */

const macro =
{
	VEHICLE_GET_COLUMN_DATA : 1,
	VEHICLE_FILTER_SEARCH : 2,
	VEHICLE_UPDATE_ROW : 3,
	VEHICLE_INSERT_ROW : 4,
	VEHICLE_PRICE_SEARCH : 5,

	CLIENT_GET_COLUMN_DATA : 6,
	CLIENT_FILTER_SEARCH : 7,
	CLIENT_UPDATE_ROW : 8,
	CLIENT_INSERT_ROW : 9,

	SALES_PENDING_NEW : 10,
	SALES_PENDING_DELETE : 11,
	SALE_FILTER_SEARCH : 12,
	SALE_GET_COLUMN_DATA: 13,
	SALE_CONFIRM_PAYMENT: 14,
	SALE_CANCEL_PAYMENT: 15,
	SALE_GET_FACTURE_INFO: 16,

	EMPLOYEE_GET_COLUMN_DATA : 17,
	EMPLOYEE_FILTER_SEARCH : 18,
	EMPLOYEE_UPDATE_ROW : 19,
	EMPLOYEE_INSERT_ROW : 20,

	REPORT_MONEY : 21,
	REPORT_INVENTORY : 22,

	LOGIN : 23,
	LOGOUT : 24
};
Object.freeze(macro);


/*
USAGE SAMPLE

CLASS
this.request = {
	"get_column_data" : macro.CLIENT_GET_COLUMN_DATA,
	"filter_search"   : macro.CLIENT_FILTER_SEARCH,
	"update_row"      : macro.CLIENT_UPDATE_ROW,
	"insert_row"      : macro.CLIENT_INSERT_ROW
}

CLASS DRIVER (postObj)
    id: module.request.filter_search,
    data: value_list

*/
