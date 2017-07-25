const schedule = require('node-schedule');
const {moment} = require('moment');

process.env.interval = 'min';

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
      rule.day = 0;
      break;
    default:
      rule.minute = 0;
      break;
  }

  return rule;
};

const rule = makeRule(new schedule.RecurrenceRule());

const job = schedule.scheduleJob(rule, function() {
  console.log(`done at ${process.env.moment.utc().format()}`);
});
