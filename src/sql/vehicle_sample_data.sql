
USE integrador;

-- sample data

-- inserts

CALL vehicle_register("Moto"  ,"Toyota"   ,"Prius" ,"2008","ABQ10", 'NUEVO', 1500900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2017","SYV11", 'NUEVO', 20300900);
CALL vehicle_register("Carro" ,"Chevrolet","Carbon","2005","IFW12", 'USADO', 10980900);
CALL vehicle_register("Carro" ,"Chevrolet","Carbon","2005","IFW12", 'USADO', 12300900);
CALL vehicle_register("Van"   ,"BMW"      ,"Camry" ,"2018","BTX13", 'NUEVO', 45000900);
CALL vehicle_register("Camion","Bugatti"  ,"Luray" ,"2021","LUH14", 'NUEVO', 37000900);
CALL vehicle_register("Carro" ,"Bugatti"  ,"Luray" ,"2021","LUH14", 'NUEVO', 17000000);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2005","SYV12", 'USADO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2006","SYV13", 'USADO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2007","SYV14", 'USADO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2008","SYV15", 'USADO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2009","SYV16", 'USADO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2010","SYV17", 'NUEVO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2011","SYV18", 'NUEVO', 13300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2012","SYV19", 'USADO', 23300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2013","SYV20", 'USADO', 23300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2014","SYV21", 'USADO', 33300900);
CALL vehicle_register("Carro" ,"Toyota"   ,"Avalon","2015","SYV22", 'USADO', 33300900);

-- update prices

CALL vehicle_update_row(NULL, NULL, NULL, NULL, NULL, NULL, 1600900, 1);
CALL vehicle_update_row(NULL, NULL, NULL, NULL, NULL, NULL, 1700900, 1);
CALL vehicle_update_row(NULL, NULL, NULL, NULL, NULL, NULL, 21300900, 2);
CALL vehicle_update_row(NULL, NULL, NULL, NULL, NULL, NULL, 20500000, 2);
CALL vehicle_update_row(NULL, NULL, NULL, NULL, NULL, NULL, 11000000, 3);
