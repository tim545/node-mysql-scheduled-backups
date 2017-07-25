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

const makeRule = function(rule) {
  switch(process.env.interval) {
    case 'minute':
    case 'min':
      rule.second = 0;
      break;
    case 'hour':
      rule.minute = 0;
      break;
    case 'day':
      rule.hour = 0;
      break;
    case 'week':
      rule.dayOfWeek = 0;
      break;
    default:
      // Every hour
      rule.minute = 0;
      break;
  }

  return rule;
};

const rule = makeRule(new schedule.RecurrenceRule());

const job = schedule.scheduleJob(rule, function() {
  mysqlBackup()
    .then(() => {
      console.log(`backup completed at ${process.env.moment.utc().format()} for ${process.env.dbname}`);
    })
    .error(() => {
      console.error(`backup failed at ${process.env.moment.utc().format()} for ${process.env.dbname}`);
    });
});
