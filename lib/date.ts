import moment, { Moment } from 'moment-timezone';


function dateTimeFormat(date?: Date | Moment) {
    if(!date) return "";
    
    return(
        moment.utc(date).local().format("HH:mm DD/MM/YYYY")
    )
}

function dateFormat(date?: Date | Moment) {
    if(!date) return "";
    
    return(
        moment.utc(date).local().format("DD/MM/YYYY")
    )
}

const now = moment().tz('Asia/Bangkok');

function getDateBy6PM() {
  const now = moment().tz('Asia/Bangkok');

  const eightPM = now.clone().hour(20).minute(0).second(0);

  // Nếu hiện tại trước 18:00 -> cộng thêm 1 ngày
  const targetDate = now.isBefore(eightPM) ? now.add(1, 'day') : now;

  return targetDate.format('DD-MM-YYYY');
}

export {
    dateFormat,
    dateTimeFormat, getDateBy6PM,
    now
};

