const {spawn} = require('child_process');
const later = require('later');
const {moment} = require('moment');

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
    `-r /${process.env.saveDir}/backup.sql`,
    process.env.dbname
  ]);

  return new Promise((resolve, reject)=> {
    mysqldump
      .stdout
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
