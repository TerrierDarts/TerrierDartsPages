function updateTime()
{
var date = new Date();
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var months = [
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
  "December"
];
var day = days[date.getDay()];
var month = months[date.getMonth()];
var dateNum = date.getDate();
var hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
var seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
var dateString = ""+day + " " + month + " " + dateNum+" |";
var timeString = "| "+hours + ":" + minutes + ":" + seconds+" ";
document.getElementById("date").textContent = dateString;
document.getElementById("time").textContent = timeString;
};

updateTime();
setInterval(function() {
  updateTime()
}, 1000);