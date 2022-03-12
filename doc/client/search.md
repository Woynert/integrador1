
## CURRENT

# Search Module

	populate_table_header ()
	populate_table ()
	populate_resumen (item)
	populate_filter_form ()
	fetch_data_table_vehicles_with_filter (driver)
	fetch_data_table_vehicles_tipos (driver)
	row_click (target, mod_search_vehicle)

# Vehicle Specific

	class mod_search_vehicle
	class driver_search_vehicle
	create_driver_search_vehicle (post_request)



## VERSION 1

-	class mod_search_vehicle
		populate_table_header ()
		populate_table ()
		populate_resumen (item)
		populate_filter_form ()	
	
-	class driver_search_vehicle
		init ()
		get_data_rows ()
		get_selected_row ()
		set_mod_edit (mod_edit)
		set_mod_register (mod_register)
		
	create_driver_search_vehicle (post_request)
	fetch_data_table_vehicles_with_filter (driver)
	fetch_data_table_vehicles_tipos (driver)
	row_click (target, mod_search_vehicle)


## VERSION 2

-	class module_search_vehicle

		tbl_vehicles
		tbl_resume
		tbl_vehicles_filter

		input_elements_filter
		input_elements_filter_checkbox

		init ()
		set_post_request (post_request)
		set_mod_edit (mod_edit)
		set_mod_register (mod_register)
		get_data_rows ()
		get_selected_row ()
		
-	class driver_module_search
		static fetch_data_table_vehicles_with_filter (module)
		static fetch_data_table_vehicles_tipos (module)
		static row_click (module, target_row)

		static populate_table_header (module)
		static populate_table (module)
		static populate_resumen (module, item)
		static populate_filter_form (module)	

	create_module_search_vehicle (post_request)



## VERSION 3

#	module_search_vehicle.js
-	class module_search_vehicle

		tbl_list
		tbl_resume
		tbl_filter

		input_filter
		input_filter_checkbox

		init ()
		set_post_request (post_request)
		set_mod_edit     (mod_edit)
		set_mod_register (mod_register)
		get_data_rows    ()
		get_selected_row ()

#	driver_module_search.js
-	class driver_module_search
		static fetch_table_list_with_filter (module)
		static fetch_table_list_types (module)
		static row_click (module, target_row)

		static populate_tbl_list_header  (module)
		static populate_tbl_list_content (module)
		static populate_tbl_resume       (module, item)
		static populate_tbl_filter       (module)	

	create_driver_search_vehicle (post_request)
	
