const li = document.querySelectorAll(".p-box-2 li");

li[1].classList.add("li-active");

/* Loads app */
function load() {

  //loads weekly data;
  requestData("Weekly");

  //Adds click events to the buttons
  li.forEach((e) => {
    e.addEventListener("click", handleClick)
  });
}

/* Handle event clicks */
function handleClick(e){

   //Sends a XMLHTTP request to get json informations
    requestData(e.target.textContent);

    //Remove active for all buttons;
    removeAllActives();

    //Toggles clicked timeframe;
    e.target.classList.toggle("li-active");
}

/* Request data from json */
function requestData(timeframe){
  const req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const jsonData = JSON.parse(this.responseText);
        reqListener(jsonData, timeframe);
        }
    };
  
  req.open("get", "data.json", true);
  
  req.send();
}

function reqListener(jsonData, timeframe){
  const hours = document.querySelectorAll(".hours h1");
  const lastHours = document.querySelectorAll(".hours p");

  console.log(timeframe);
  for (let i = 0; i < hours.length; i++) {
    switch (timeframe){
      case 'Daily': 
      hours[i].textContent = jsonData[i].timeframes.daily.current + 'hrs';
      lastHours[i].textContent = 'Last Day - ' + jsonData[i].timeframes.daily.previous + 'hrs';
      break;
      case 'Weekly': 
      hours[i].textContent = jsonData[i].timeframes.weekly.current + 'hrs';
      lastHours[i].textContent = 'Last Week - ' +  jsonData[i].timeframes.weekly.previous + 'hrs';
      break;
      case 'Monthly': 
      hours[i].textContent = jsonData[i].timeframes.monthly.current + 'hrs';
      lastHours[i].textContent = 'Last Month - ' + jsonData[i].timeframes.monthly.previous + 'hrs';
      break;
    }
    
  }
}

function removeAllActives(){
    li.forEach(l =>  l.classList.remove("li-active"));
}

load();
