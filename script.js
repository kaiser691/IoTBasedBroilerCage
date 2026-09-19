
//web dashboard variables
let status = "OFFLINE";
let powerSaver = false;
window.temperature = 0; //in degrees Celsius
window.humidity = 0; //in percentage
window.feederContainer1 = 0; //in percentage
window.feederContainer2 = 0; //in percentage
window.waterContainer = 0; //in percentage

let statusText = document.getElementById("status");
let outerContainer = document.getElementById("outer-container");

const root = document.documentElement;
const container = document.getElementById('data-container');
const tempValue = container.querySelector('.gauge.temperature .value');
const humidityValue = container.querySelector('.gauge.humidity .value');
const feederContainer1Value = container.querySelector('.bar-container.feeder-container-1 .bar-fill');
const feederContainer2Value = container.querySelector('.bar-container.feeder-container-2 .bar-fill');



function toggleWaterContainer() {
   root.style.setProperty('--water-bar-percentage', `${waterContainer}%`);
   container.querySelector('#water-percentage').textContent = `${waterContainer}%`;
}

function toggleFeederContainer1() {
   root.style.setProperty('--feeder-bar-percentage-1', `${feederContainer1}%`);
   container.querySelector('#feeder-1-percentage').textContent = `${feederContainer1}%`;
}

function toggleFeederContainer2() {
   root.style.setProperty('--feeder-bar-percentage-2', `${feederContainer2}%`);
   container.querySelector('#feeder-2-percentage').textContent = `${feederContainer2}%`;
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ( (value - inMin) * (outMax - outMin) ) / (inMax - inMin);
}


function updateTempHumidity(){
   tempValue.textContent = `${temperature}°C`;
   humidityValue.textContent = `${humidity}%`;

   var tempAngle = mapRange(temperature, 0, 100, 30, 270);
   var humidityAngle = mapRange(humidity, 0, 100, 30, 270);

   if (temperature <= 0){
      tempAngle = 0;
   }if (humidity <= 0){
      humidityAngle = 0;
   }if (temperature >= 100){
      tempAngle = 270;
   }if (humidity >= 100){
      humidityAngle = 270;
   }

   console.log(`Temperature Angle: ${tempAngle}degrees`);
   console.log(`Humidity Angle: ${humidityAngle}degrees`);

   if(temperature <= 0){
      root.style.setProperty('--temperature', `${mapRange(0, 0, 100, 0, 270)}deg`);
   }else if(temperature >= 100){
      root.style.setProperty('--temperature', `${mapRange(100, 0, 100, 0, 270)}deg`);
   }else{
      root.style.setProperty('--temperature', `${mapRange(temperature, 0, 100, 0, 270)}deg`);
   }

   if(humidity <= 0){
      root.style.setProperty('--humidity', `${mapRange(0, 0, 100, 0, 270)}deg`);
   }else if(humidity >= 100){
      root.style.setProperty('--humidity', `${mapRange(100, 0, 100, 0, 270)}deg`);
   }else{
      root.style.setProperty('--humidity', `${mapRange(humidity, 0, 100, 0, 270)}deg`);
   }
      

}

updateTempHumidity();
toggleFeederContainer1();
toggleFeederContainer2();
toggleWaterContainer();
