
-- user setup

CREATE USER reider IDENTIFIED BY 'upbbga';
GRANT ALL PRIVILEGES ON *.* TO reider;
GRANT ALL PRIVILEGES ON *.* TO 'reider'@'localhost' IDENTIFIED BY 'upbbga';
