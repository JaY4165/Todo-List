let get_day = document.getElementById("today-day");
let get_date = document.getElementById("today-date");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();

let day = weekday[d.getDay()];

get_day.innerHTML = day;

let month = months[d.getMonth()];

get_date.innerHTML = month + " " + d.getDate() + " , " + d.getFullYear();
