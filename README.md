# node-mysql-scheduled-backups
scheduled backups for MySQL databases using Later.js

### Running the container

```
docker run \
-e user="" \
-e pass="" \
-e host="" \
-e port="" \
-e dbname="" \
-e interval="" \
-e saveDir="/tmp" \
<container-name>
```

`docker run backup-test -e port="32770" -e dbname="appmyfocus" -e host="127.0.0.1" -e interval="minute"`

### Environment variables

**user**

MySQL user name

**pass**

MySQL password

**host**

MySQL host

**port**

MySQL port number

**dbname**

MySQL database name

**interval**

How often you want to run the backup. Must be a string of one of these options:

"minute", "hour", "day", "week", "month", "year"

**saveDir**

Directory to store the backup files, relative to file system root.
