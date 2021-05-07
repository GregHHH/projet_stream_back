var moment = require('moment');

function formatMessage(pseudo, text) {
  return {
    pseudo,
    text,
    time: moment().calendar() 
  };
}

module.exports = formatMessage;
