
USE integrador;

-- drop

DROP PROCEDURE IF EXISTS report_money;
DROP PROCEDURE IF EXISTS report_inventory;


-- reporte monetario

DELIMITER //
CREATE PROCEDURE report_money ()
BEGIN

	-- ganancias, perdidas

	SELECT
		IF((total_sum - subtotal_sum)>0,
		    total_sum - subtotal_sum,
		    0) AS `ganancias`,
		IF((total_sum - subtotal_sum)<0,
		    (total_sum - subtotal_sum)*(-1),
		    0) AS `perdidas`
	FROM
		(
		SELECT
			SUM(subtotal) AS `subtotal_sum`,
			SUM(total) AS `total_sum`
		FROM
			sales s
		WHERE
			s.state = "PAGADO"
		) res
	;

	-- total cuentas por pagar, total cuentas por cobrar

	SELECT
		SUM(subtotal) AS `por_pagar`,
		SUM(total) AS `por_cobrar`
	FROM
		sales s
	WHERE
		s.state = "PENDIENTE"
	;

	-- ventas realizadas

	SELECT
		s.ID, payed, total
	FROM
		sales s
	WHERE
		s.state = "PAGADO"
	;

	-- ventas pendientes

	SELECT
		s.ID, created, total
	FROM
		sales s
	WHERE
		s.state = "PENDIENTE"
	;

END ;
//
DELIMITER ;




-- reporte inventario

DELIMITER //
CREATE PROCEDURE report_inventory ()
BEGIN

	SELECT
		marca,
		id_from_marca,
		tipo_vehiculo,
		modelo,
		generacion,
		condicion,
		precio,
		cantidad
	FROM
		view_vehicles
	WHERE
		cantidad > 0
	;

END ;
//
DELIMITER ;
