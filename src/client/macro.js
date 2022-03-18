
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

	CLIENT_GET_COLUMN_DATA : 5,
	CLIENT_FILTER_SEARCH : 6,
	CLIENT_UPDATE_ROW : 7,
	CLIENT_INSERT_ROW : 8,

	SALES_PENDING_NEW : 9,
	SALES_PENDING_DELETE : 10,
	SALE_FILTER_SEARCH : 11,
    SALE_GET_COLUMN_DATA: 12
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
