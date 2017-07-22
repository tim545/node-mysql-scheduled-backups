const {spawn} = require('child_process');
const schedule = require('node-schedule');
const {moment} = require('moment');

const mysqlBackup = function() {
  const mysqldump = spawn('mysqldump', [
    `-u ${process.env.user}`,
    `-p${process.env.pass}`
    `-h ${process.env.host}`
    `--port=${process.env.port}`,
    `-r /${process.env.saveDir}/${process.env.dbname}-backup.sql`,
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

const rule = new schedule.RecurrenceRule();

switch(process.env.interval) {
  case 'minute':
  case 'min':
    rule.minute = 0;
    break;
  case 'hour':
    rule.hour = 0;
    break;
  case 'day':
    rule.day = 0;
    break;
  case 'week':
    // TBD
    break;
  default:
    rule.hour = 0;
    break;
}

const job = schedule.scheduleJob(rule, function() {
  console.log(`backup completed at ${process.env.moment.utc().format()} for ${process.env.dbname}`);
});
