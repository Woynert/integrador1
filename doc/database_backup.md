
# Backup Base de datos

El backup automatico está activado para que cada dia a las 11:00 AM se cree un backup.

### Comprobar el estado del backup

Podemos comprobar que está activado al ejecutar el comando:

```
crontab -l
```

El cual deberia devolver un resultado como el siguiente:

```
00 11 * * * /script/mariadb_backup.sh
```

Indicando que está activo el backup automatico.

### Almacenamiento del backup

Los backups son almacenados en el directorio `/var/mariadb/backup`. Esto puede ser cambiado editando el script ubicado en `/script/mariadb_backup.sh`.

### Restaurar backup

Para reestablecer el sistema desde el backup puede ejecutar el siguiente script como usuario root.

```
/script/mariadb_restore_backup.sh
```



