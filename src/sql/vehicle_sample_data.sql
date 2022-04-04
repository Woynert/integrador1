
USE integrador;

-- sample data

-- inserts

CALL vehicle_register("consbin", 1, "Moto"  ,"Prius" ,"2008", 'NUEVO', 1500900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2017", 'NUEVO', 20300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Carbon","2005", 'USADO', 10980900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Carbon","2005", 'USADO', 12300900, 2);
CALL vehicle_register("consbin", 0, "Van"   ,"Camry" ,"2018", 'NUEVO', 45000900, 2);
CALL vehicle_register("consbin", 0, "Camion","Luray" ,"2021", 'NUEVO', 37000900, 2);

/*
CALL vehicle_register("consbin", 0, "Carro" ,"Luray" ,"2021", 'NUEVO', 17000000, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2005", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2006", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2007", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2008", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2009", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2010", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2011", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2012", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2013", 'USADO', 13300900, 2);
CALL vehicle_register("consbin", 0, "Carro" ,"Avalon","2014", 'USADO', 13300900, 2);
*/

-- update prices

CALL vehicle_update_row("consbin", 1, NULL, NULL, NULL, NULL, 1600900, NULL);
CALL vehicle_update_row("consbin", 1, NULL, NULL, NULL, NULL, 1700900, NULL);
CALL vehicle_update_row("consbin", 2, NULL, NULL, NULL, NULL, 21300900, NULL);
CALL vehicle_update_row("consbin", 2, NULL, NULL, NULL, NULL, 20500000, NULL);
CALL vehicle_update_row("consbin", 3, NULL, NULL, NULL, NULL, 11000000, NULL);

