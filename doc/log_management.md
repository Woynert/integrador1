
# Gestión de log

Los Logs son archivos que recopilan información sobre los eventos que suceden en un servicio. Son generalmente archivos de texto plano.

### Revisar un log

Para ver el contenido de un log ubicado en `/path/to/log` puede usar el comando cat, tail o less.

```
cat /path/to/log
tail /path/to/log
less /path/to/log
```

Esto mostrará en pantalla sus contenidos.

### Ubicación de log por servicio

- mariaDB (Bases de datos): `/var/lib/mysql/mariadb.log`
- nodeJS (Nucleo sistem de gestión): `/var/log/runit/nodejs/*`
- lighttpd (Servidor HTTPS): `/var/log/runit/lighttpd/*`
- postfix (Servidor MAIL): `/var/log/mail.*`
- asterisk (Servidor VOIP): `/var/log/asterisk/*`
- vsftpd (Servidor FTPS): `/var/log/vsftpd.log`
