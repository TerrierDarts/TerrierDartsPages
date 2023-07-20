//https://codepen.io/nicolasjesenberger/pen/VwEzMrY/81eb6139c2c9b7dbc46e43d898e7d29b.js

const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderSvg = document.querySelector('.slider-svg');
const sliderPath = document.querySelector('.slider-svg-path');
const sliderThumb = document.querySelector('.slider-thumb');
const sliderInput = document.querySelector('.slider-input');
const sliderMinValue = +sliderInput.min || 0;
const sliderMaxValue = +sliderInput.max || 100;

const time = document.querySelector('.slider-value');
const colorStops = [
  { r: 243, g: 217, b: 112 },  // #F3D970
  { r: 252, g: 187, b: 93 },   // #FCBB5D
  { r: 246, g: 135, b: 109 },  // #F6876D
  { r: 147, g: 66, b: 132 },   // #934284
  { r: 64, g: 40, b: 98 },     // #402862
  { r: 1, g: 21, b: 73 }        // #011549
];

const updateTime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  const isMorning = hours < 12;
  const formattedHours = String(hours === 24 ? '00' : (hours || '00')).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  time.textContent = `${formattedHours}:${formattedMinutes} ${isMorning || hours === 24 ? 'AM' : 'PM'}`;
};

const setColor = () => {
  const date = new Date();
  const x = Math.floor((date.getHours() * 10) / 50);
  const colour = colorStops[x];
  sliderThumb.style.setProperty('--color', `rgb(${colour.r}, ${colour.g}, ${colour.b})`);
};

const updatePosition = () => {
  const date = new Date();
  const x = date.getHours()/24;
  const sliderPathLength = sliderPath.getTotalLength();
  const point = sliderPath.getPointAtLength(x * sliderPathLength);
  const svgRect = sliderSvg.getBoundingClientRect();
  const scaleX = svgRect.width / sliderSvg.viewBox.baseVal.width;
  const scaleY = svgRect.height / sliderSvg.viewBox.baseVal.height;
  sliderThumb.style.left = `${(point.x * scaleX * 100) / svgRect.width}%`;
  sliderThumb.style.top = `${(point.y * scaleY * 100) / svgRect.height}%`;
  const value = Math.round(x * (sliderMaxValue - sliderMinValue));
  sliderInput.value = value;

  
  const totalMins = (date.getHours() * 60) + date.getMinutes();
  updateTime(totalMins);
  setColor(date.getHours());
};

setInterval(updatePosition, 1000);


updatePosition(0.1);