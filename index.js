import {spawn} from 'child_process';
import {later} from 'later';
import * as moment from 'moment';
import {Dropbox} from 'dropbox';

const dbx = new Dropbox({ accessToken: process.env.dropboxToken });
const interval = setInterval(process.env.interval);

function setInterval(customInterval) {
  let recur;

  switch(customInterval) {
    case 'minute':
      recur = later.parse.recur().last().secondOfMinute();
      break;
    case 'hour':
      recur = later.parse.recur().last().minuteOfHour();
      break;
    case 'day':
      recur = later.parse.recur().last().hourOfDay();
      break;
    case 'week':
      recur = later.parse.recur().last().dayOfWeek();
      break;
    case 'month':
      recur = later.parse.recur().last().dayOfMonth();
      break;
    case 'year':
      recur = later.parse.recur().last().dayOfYear();
      break;
    default:
      recur = later.parse.recur().last().dayOfWeek();
      break;
  }

  return recur;
};

const mysqlBackup = function() {
  const mysqldump = spawn('mysqldump', [
    `-u ${process.env.user}`,
    `-p${process.env.pass}`
    `-h ${process.env.host}`
    `--port=${process.env.port}`,
    '-r /tmp/backup.sql',
    process.env.dbname
  ]);

  // Dropbox upload
  const upload = ()=> {
    dbx.filesUpload({
      path: `/node-mysql-scheduled-backups/${process.env.dbname}/${process.env.dbname}-${moment.utc().format('YYYY-MM-DD')}.sql`,
      autorename: true
    });
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
