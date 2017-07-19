import {spawn} from 'child_process';
import {later} from 'later';
import * as moment from 'moment';

const interval = later.parse.recur().last().dayOfMonth();

const mysqlBackup = function() {
  const mysqldump = spawn('mysqldump', [
    `-u ${process.env.user}`,
    `-p${process.env.pass}`
    `-h ${process.env.host}`
    `--port=${process.env.port}`,
    '-r /tmp/backup.sql',
    process.env.dbname
  ]);

  // Google Drive upload
  const upload = ()=> {
    // `-r /tmp/${process.env.dbname}-${moment.utc().format('YYYY-MM-DD')}.sql`
  };

  return new Promise((resolve, reject)=> {
    mysqldump
      .stdout
      .pipe(upload)
      .on('finish', ()=> {
        resolve();
      })
      .on('error', (err)=> {
        reject(err);
      });
  });
};

later.date.UTC();
later.setInterval(mysqlBackup, interval);
