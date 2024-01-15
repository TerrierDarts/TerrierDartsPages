const el = document.getElementById('date');
function updateTime() {

  let options = { //See Below for help on the options
  //weekday: 'short',
  //era: 'short',
  //year:  '2-digit',
  //month:  'short',
  //day:  '2-digit',
  //hour:  '2-digit',
  //minute:  '2-digit',
  //second:  '2-digit',
  //timeZoneName:  'short',
  //hour12: false,
  //timeZone: 'Europe/London',
  dateStyle: 'full',
  timeStyle: 'medium', 
};
  
  
  
  date.textContent = new Intl.DateTimeFormat('en-GB', 
    options
  ).format(new Date());
};

updateTime();
setInterval(updateTime, 1000);

/*
{
  weekday: 'narrow' | 'short' | 'long',
  era: 'narrow' | 'short' | 'long',
  year: 'numeric' | '2-digit',
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  day: 'numeric' | '2-digit',
  hour: 'numeric' | '2-digit',
  minute: 'numeric' | '2-digit',
  second: 'numeric' | '2-digit',
  timeZoneName: 'short' | 'long',

  // Time zone to express it in
  timeZone: 'Asia/Shanghai',
  // Force 12-hour or 24-hour
  hour12: true | false,

  // Rarely-used options
  hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
  formatMatcher: 'basic' | 'best fit'
  
  //Styles
  dateStyle: 'full'| 'long| 'medium'| 'short',
  timeStyle: 'full'| 'long| 'medium'| 'short',
}
*/