const newDate = new Date();
const date = newDate.getDate();
const month = newDate.getMonth();
const year = newDate.getFullYear();
const days = newDate.getDay();
const minutes = newDate.getMinutes();
const hours = newDate.getHours();

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const day = weekDays[days];

const dates = `${date} ${months[month]} ${year}`;
const dateWeek = `${day}, ${date} ${months[month]} ${year}`;
const time = `${hours}:${minutes}`;
const utcdate = newDate;

export { dates, dateWeek, time, utcdate };