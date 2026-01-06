import moment, { Moment } from "moment";

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

export {
    dateFormat, dateTimeFormat
};
