
USE integrador;

-- sample data

call sales_pending_new(5,3,'consbin',4,'',25);
call sales_pending_new(2,1,'consbin',1,'',0);
call sales_pending_new(1,1,'consbin',2,'',50);

/*INSERT INTO sales (
	id_client,
	id_employee,
	id_vehicle,
)
VALUES
(5, 7),
(2, 1)
;*/

