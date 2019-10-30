// ******************************************************************
// PubSub Module 
// ******************************************************************
// ??? Should we import IIFEs or functions that we call ???

import { pubsub } from './js/pubSub.js';

/*
let pubsub = (function() {
    
    return {
        
        events: {},
        
        subscribe: function(eventName, fn, data1) {
//            console.log(this)
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(fn);
//            console.log(this.events)
        },
        
        unsubscribe: function(eventName, fn) {
            if (this.events[eventName]) {
                for (let i=0; i<this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === fn) {
                        this.events[eventName].splice(i, 1);
                        break;
                    }
                }
            }
        },
        
        emit: function(eventName, data1, data2) {
            if (this.events[eventName]) {
                this.events[eventName].forEach(function(fn) {
                    fn(data1, data2);
                })
            }
        }
    
    }
        
})();
*/



// ******************************************************************
// // JQuery - SLICK library for the "hour" slider
// ******************************************************************
import { moveHourSlider } from './js/slickMod.js';
//moveHourSlider();
/*
let moveHourSlider = (function() {

    $('.center').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
        arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

    // get rid of side arrows
    $(document).ready(function() {
        $(".set-time__scene").slick({
            arrows:false
        });
    });    
    
})();

*/


// ******************************************************************
// "Vanilla" JavaScript for the "minute" slider - own code
// ******************************************************************
import { moveMinuteSlider } from './js/minuteSlider.js';
//moveMinuteSlider();

/*
const moveMinuteSlider = (function() {
    let direction, limitTest, singleDistance, distToMove, transXMax, transXMin;
    
    const minutes = document.querySelector(".set-time__minutes");
    const sliderMinutes = document.querySelector(".slider-minutes");
    const minuteItems = document.querySelectorAll(".set-time__minute-item");
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let distX = 0;
    let totalDistance = 0;
    
    minutes.addEventListener("touchstart", function(event) {
        startX = parseInt(event.changedTouches[0].clientX);
        //        minuteItems.forEach(el => el.style.opacity = 1);
    })

    
    minutes.addEventListener("touchmove", function(event) {
        event.preventDefault();
        let moveX = parseInt(event.changedTouches[0].clientX);
        distX = Math.abs(startX - moveX);
        direction = (startX - moveX) > 0 ? "left" : "right";
        
        let touchMove = direction === "left" ? distX * -1 : distX;
        
        sliderMinutes.style.transform = `translateX(${ touchMove + totalDistance}px)`;
        
    })
    
    
    minutes.addEventListener("touchend", function(event) {
        let endX = parseInt(event.changedTouches[0].clientX);
        singleDistance = endX - startX;
        let limitLeft = 0;
        let limitRight = - 450;
        totalDistance += singleDistance;
        
        if (totalDistance > limitLeft) {
            sliderMinutes.style.transform = `translateX(${limitLeft}px)`;
            totalDistance = 0;
        } else if (totalDistance < limitRight) {
            sliderMinutes.style.transform = `translateX(${limitRight}px)`;
            totalDistance = limitRight;
        }
        */
        // Slider MINUTES opacity
       /* setTimeout(function() {
            minuteItems.forEach(el => el.style.opacity = .5);
            minuteItems.forEach(el => el.style.transition = "opacity " + 1 + "s");
//            transition: opacity .5s;
        }, 4000)*/
         
        
        // ********** "DRAGABLE" FEEL - working code **************
        /*  
        let totalDistance = Math.abs(startX - endX);
      limitTest = !!(Math.abs(endX - startX) > limit);
        console.log(limitTest)
        if (limitTest) {
            sliderMinutes.style.transform = `translateX(75px)`;
        } else {
            sliderMinutes.style.transform = `translateX(0px)`;
        }
        
    
    })
})();
*/

// ***********************************************************************************
// DATA Module - module that handles data processing 
//************************************************************************************
let dataModule = (function() {
    
    let alarmWeekDays = [];  
   /* let alarmWeekDays = {
      html: [],
      labels: []
    }*/
    
    let getCurrTime = function() {
        let currTime = new Date();
        return currTime;
    };
    
    let timeCurrObj = {
        
        timeString: function() {
           let timeNow = new Date();
           return timeNow.toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"})
        },
        timeArray: function() {
            return this.timeString().split(/:| /);
        },
        hour: function() {
            return this.timeArray()[0];
        },
        minute: function() {
            return this.timeArray()[1];
        },
        label: function() {
            return this.timeArray()[2];
        }
    };
    
     
    
    return {
        
        getTimeNow: function() {
            return timeCurrObj.timeString();
        },
        
        
        // calc future time when in "in" mode
        calcFutureTimeIn: function(time, ampm) {
            
//            let futureTime;
            let amPm = ampm;
            let timeArr = time; // [2, 30]
            
            let timeNowMs = getCurrTime().getTime();
            let timeFutureMs = timeNowMs + time[0] * 3600000 + time[1] * 60000;

            let timeFuture = new Date(timeFutureMs).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});    
             
            return timeFuture;
        },
        
        
        // calc future time when in "at" mode
        calcFutureTimeAt: (time, ampm) => {
            let futureTotal, futureTime;
            let amPm = ampm;
            let timeArr = time; // [2, 30]
                
            if (timeArr) {
              // Calc current time to millitary
              let nowMillitary = new Date().toLocaleTimeString(navigator.language, {hour12: false, hour: "2-digit", minute: "2-digit"}).split(":");

              // Calc wake-up time to millitary
              let futureMillitary = amPm === "am" ? `${timeArr[0]}:${timeArr[1]}`.split(":") : `${timeArr[0] + 12}:${timeArr[1]}`.split(":");

              // Change current millitary to milliseconds
              let nowMillitaryToMs = nowMillitary[0] * 3600000 + nowMillitary[1] * 60000;

              // Change wake-up millitary to milliseconds
              let futureMillitaryToMs = futureMillitary[0] * 3600000 + futureMillitary[1] * 60000; 

              // Calc if wake-up time is on the same day or next
              if (nowMillitaryToMs > futureMillitaryToMs) {
                  // remaining milliseconds till the end of the current day
                  let differenceMs24 = 86400000 - nowMillitaryToMs;

                  // total milliseconds from now till wake-up time
                  futureTotal = futureMillitaryToMs + differenceMs24;     
              } else {
                  futureTotal = futureMillitaryToMs - nowMillitaryToMs;
              }

              // calc hours & minutes
              let remainingHour = Math.floor(futureTotal / 3600000) < 10 ? "0" + Math.floor(futureTotal / 3600000) : Math.floor(futureTotal / 3600000);
              let remainingMinute = Math.floor((futureTotal % 3600000) / 60000) < 10 ? "0" + Math.floor((futureTotal % 3600000) / 60000) : Math.floor((futureTotal % 3600000) / 60000);

              futureTime = `${remainingHour}:${remainingMinute}`; 

              return futureTime;
            
            } else {
              return;
            }
        },
      
        
        updateAlarmDays: function(event) {
          let selectedDay = event.target;
          let weekDay = selectedDay.innerHTML;
          let index = alarmWeekDays.findIndex(el => el === weekDay );
      
          // add / remove 'weekDays' in 'alarmWeekDays' array
          index === -1 ? alarmWeekDays.push(weekDay) : alarmWeekDays = alarmWeekDays.filter(el => el !== weekDay);         
  
          return alarmWeekDays;
        },
      
        
        // 
        getAlarmDays: function() {
          return alarmWeekDays;
        },
      
      
        
        
    }
    
})();



// ***********************************************************************************
// User Interface Module - handles all UI interaction
//************************************************************************************

let UIModule = (function() {
    
    let labelClass;
    
    const getDOM = {
        timeNow: document.querySelector(".date-time__display"), //
        radioBtnBox: document.querySelector(".radio-btn-box"),
        amPmBox: document.querySelector(".am-pm"),
        weekDays: document.querySelectorAll(".day"),
        setTimeBox: document.querySelector(".set-time"),
        displayTimeBox: document.querySelector(".time-display__time-box").children, 
        futureTimeDisp: document.getElementById("hour"), 
        atInDisplay: document.querySelectorAll("[class*='prep']"),
        timeCalcBox: document.querySelector(".time__calc-box"),
        amPmSwitch: document.querySelector(".am-pm__radio-box"),
        amPmSelector: document.querySelector(".toggle-outside"),
        ampmFuture: document.querySelector(".time-calc__ampm"),
        body: document.querySelector("body"),
        sliderContainer: document.querySelector('.content'),
        timeDispPrep: document.querySelector('.time-display__prep'),
        timeCalcPrep: document.querySelector('.time-calc__prep'),
        saveResetBox: document.querySelector(".save-reset__container"),
        saveBtn: document.querySelector(".btn-save"),
        resetBtn: document.querySelector(".btn-reset"),
        alarmList: document.querySelector(".alarm"),
        
    };
    
    

    return {
        
        // return DOM elements 
        DOMParts: function() {
            return getDOM;
        },
        
        
        // display current time at the top
        displayTimeCurr: function(time) {
            getDOM.timeNow.textContent = time;
        },
        
        // define selected mode's preposition ('at' or 'in')
        getPreposition: function(label) {
          if (label) {
            let getPrepos = label.split("-");
            return getPrepos[1];  
          }
        },
      
      
        // add/remove "active" class to show AM / PM button
        displayAmPmBtn: function(label) {
            labelClass = label;
            
            if (labelClass === "input-at") {
                getDOM.amPmBox.classList.add("am-pm__active");
            } else if (labelClass === "input-in") {
                getDOM.amPmBox.classList.remove("am-pm__active");
            }
        },
        
        
        // Add/remove "active" class to every "day" element
        displayWeekDays: function(label) {
            let curEl = getDOM.weekDays;
            let counter = 0;
        
            for (let i=curEl.length - 1; i >=0; i--) {
                
                setTimeout(function() {
                    if (label === "input-at") {
                        curEl[i].classList.add("active"); 
                    } else if (label === "input-in") {
                        curEl[i].classList.remove("active");
                    }
                }, counter * 50);
                
                counter++
            }
        },
        
        
        moveTimeBox: function() {
            getDOM.timeCalcBox.classList.add("display");
            
        },
        
        
        // Toggle "at" or "in" on main display & future time display
        displayAtOrIn: function(label) {

          console.log("DISPLAY", label)
            if (label) {
              let getPrepos = label.split("-");
              let atOrIn = getPrepos[1] === "in" ?  "at" : "in";
              let dispAmPm = getDOM.displayTimeBox[getDOM.displayTimeBox.length - 1];

              if (labelClass) {
                  getDOM.atInDisplay[0].innerHTML = getPrepos[1];
                  getDOM.atInDisplay[1].innerHTML = atOrIn;

                  getDOM.atInDisplay.forEach((el) => el.classList.add("display"));
                  dispAmPm.classList.add("display");
              } 

              if (getPrepos[1] === "in") {
                  dispAmPm.classList.remove("display");
              }
            }
        },
      
        
      
        // display colors at respective UI elements
        selectColor: function(label) {
          if (label) {
            let selectClass;
            let prep = label.split('-')[1];
            let opposite = prep === "at" ? 'in' : "at";
            let selectHTML = (x) => {
              selectClass = document.querySelector(`.radio__${x}`);
            }
              
          // add classes to "at"/"in" HTML elements 
            getDOM.atInDisplay.forEach((el, i, arr) => {            arr[i].classList.remove(`color-${opposite}`);
              arr[i].classList.remove(`color-${prep}`);      
            });
            selectHTML(opposite);
            selectClass.classList.remove(`color-${opposite}`);

            // Add 'color-in' or 'color-at' class
            selectHTML(prep);
            selectClass.classList.add(`color-${prep}`);
            getDOM.atInDisplay.forEach((el, i, arr) => arr[i].classList.add(`color-${el.innerHTML}`));
          }
        },
        
        
        // Reset main time display
        resetMainTime: function() {
            for (let i of getDOM.displayTimeBox) {
                let labelCheck = i.getAttribute("label");
                
                if (labelCheck) {
                    i.innerHTML = "00";    
                }
            }
        },
        
        
        // Reset time display and future display to 00:00
        resetAllTimes: function() {
            controllerModule.init();
        },
        
        
        // Get time label (hour / minute) and time value from the minute/hour sliders
        getClickedTime: function(event) {
            let item = event.target;
            
            let itemLabel = item.getAttribute("label");
            let itemValue = parseInt(item.innerHTML);
            
            return {"label": itemLabel, "value": itemValue};
        },
        
        
         // Get AM or PM from UI
        retrieveAmPm: function(event) {
            let amPm = event.target.getAttribute("value") ;
            return amPm;
        },
        
        
        // Move am/pm selector 
        moveAmPmSelector: function(label) {
            if (label === "pm") {
                getDOM.amPmSelector.classList.add("active");
            } else if (label === "am") {
                getDOM.amPmSelector.classList.remove("active");
            }
        },
        
        
        // Display AM / PM selection on the main time display
        displayAmPm: function(label) {
            let DOMel = getDOM.displayTimeBox[getDOM.displayTimeBox.length - 1];
            console.log(DOMel)
            
            DOMel.innerHTML = label;
            
        },
        
        
        // Display clicked time in main time display box
        displayClickedTime: function(clickedTime) {
            
            console.log("clickedTime", !!(clickedTime.label))
            
            if (!clickedTime.label) { // prevents NAN to display on the main display
                return;
            }
            
            let time = clickedTime;
            
            for (let i of getDOM.displayTimeBox) {
                if (i.getAttribute("label") === time.label) {
                    i.innerHTML = time.value < 10 ? "0" + time.value : time.value ;
                }
            }
        },
        
        
        // Get clicked time from the display
        getDisplayedTime: function(el) {
            let timeArr = [];
            
            for (let i of el) {
                let num = Number(i.innerHTML);

                if (Number.isInteger(num)) {
                    timeArr.push(num)
                }
            }
            return timeArr;
        },
        
        
        // Display future time
        displayFutureTime: function(futureTime) {

            if (futureTime) {
              let splitTime = futureTime.split(" ");
            
              getDOM.futureTimeDisp.innerHTML = splitTime[0];
              
              // a quick 'hack' to style 'AM' vs 'min h' in the future time display:
              if (labelClass === "input-in") {
                  getDOM.ampmFuture.innerHTML = splitTime[1];
                  getDOM.ampmFuture.classList.add("active");
                  getDOM.ampmFuture.style.opacity = 0.9;

              } else if (labelClass === "input-at") {
//                  getDOM.ampmFuture.classList.remove("active");
                  getDOM.ampmFuture.classList.add("active");
                  getDOM.ampmFuture.style.fontSize = `12px`;
                  getDOM.ampmFuture.style.opacity = 0.5;
                  getDOM.ampmFuture.innerHTML = `&nbsp h &nbsp &nbsp &nbsp min`;
              }

            }
        },
      
        // add CSS class to selected weekdays
        addDayClass: function(event) {
          let selectedDay = event.target;
          selectedDay.classList.toggle("clicked");
        },
      
      
        // Add font color to "save" & "reset" buttons ("at" or 'in' mode)
        addSaveResetColor: function(item) {
          let prep = item.split('-')[1];
          let opposite = prep === 'at' ? 'in' : 'at';
          
          if (item) {
            getDOM.saveResetBox.classList.remove(`color-${opposite}`);
            getDOM.saveResetBox.classList.add(`color-${prep}`);
          }
        },
      
        
        // add alarm to alarms list 
        addAlarmItem: function(atOrIn, amOrPm, displayedTime, futureTime, alarmDays) {
          let prep = atOrIn.split('-')[1];
          let alarmTime = displayedTime.join(":")
          console.log(prep, amOrPm, alarmTime, futureTime, alarmDays)
          
          alarmDays.forEach(el => {
            const html = `<div class="alarm__item color-${prep}">
                    <i class="alarm__icon ion-md-alarm"></i>  
                    <div class="alarm__day">${el}</div>
                    <div class="alarm__time">${alarmTime} ${amOrPm}</div>
                    <button class="alarm__delete--btn"><i class="alarm__delete--icon alarm__icon ion-md-close-circle-outline"></i></button>
                  </div>`;
            
            getDOM.alarmList.insertAdjacentHTML("beforeend", html);
          })
        },
      
      //https://css-tricks.com/different-approaches-for-creating-a-staggered-animation/
        showAlarmItem: function() {
          const alarmItems = document.querySelectorAll(".alarm__item");
          let counter = 0;
          
          console.log(alarmItems.length) // 2
          
          const addToUI = function() {
            if (counter >= alarmItems.length) {
              clearInterval(interval);
            } else {
              alarmItems[counter].classList.add('alarm-show');
              counter ++;
            } 
          };
          
          const interval = setInterval(addToUI, 200);
        },
      
      
        // remove 'active' class from days of the week
        resetAlarmDays: function() {
          console.log()
          getDOM.weekDays.forEach(el => el.classList.remove('clicked'))
        },
        
    }
    
})();



// ***********************************************************************************
// Controller Module
//************************************************************************************

let controllerModule = (function(dataMod, UIMod) {
    
    let appState = false;
    let atOrIn; 
    let amOrPm = "am"; 
    let displayedTime;
    let futureTime;
    let alarmWeekDays = [];
    
    // Get DOM elements from UI Module
    const DOMElements = UIMod.DOMParts();
    console.log(DOMElements)
   
  
    // set up eventListeners
    const bindEvents = function() {
        
        DOMElements.body.onload = () => { // <== Should this fun be in init()???
          updateClock();
          moveHourSlider();
          moveMinuteSlider();
          DOMElements.sliderContainer.classList.add('opaque');
        };
      
        DOMElements.radioBtnBox.addEventListener("click", selectRadioBtn);
        DOMElements.setTimeBox.addEventListener("click", setTimeDisplay);
        DOMElements.amPmSwitch.addEventListener("click", selectAmPm);
        DOMElements.weekDays.forEach((el) => {
          el.addEventListener('click', selectWeekDay);
        });
        DOMElements.saveBtn.addEventListener("click", clickSaveAlarm);
        DOMElements.resetBtn.addEventListener("click", clickResetBtn);
    
    };
    
    
    // Set current time & display clock on top
    const updateClock = function() {

        // get current time hh:mm am/pm format
        let currentTime = dataMod.getTimeNow();
        
        // display current time at the top
        UIMod.displayTimeCurr(currentTime);
        
        // update time variable & update time display every 10 seconds
        let setTimeUpdate = setInterval(function() {
            currentTime = dataMod.getTimeNow();
            UIMod.displayTimeCurr(currentTime);
        }, 10000);
        
    };

        
    // Select "at"/"in" time format, update UI
    let selectRadioBtn = function(event) {
        
        appState = true;
        
        // Remove opacity from slider container 
        DOMElements.sliderContainer.classList.remove('opaque');
      
        if (appState) {
          let classLabel = event.target.getAttribute("class");
          atOrIn = classLabel;

          // define preposition
          pubsub.subscribe("selectAtIn", UIMod.getPreposition);

          
          
          // "subscribe" to show AM/PM button 
          pubsub.subscribe("selectAtIn", UIMod.displayAmPmBtn);

          // "subscribe" to show weekdays
          pubsub.subscribe("selectAtIn", UIMod.displayWeekDays);

          // "subscribe" show future time box
          pubsub.subscribe("selectAtIn", UIMod.moveTimeBox);

          // "subscribe" to show "at" or in on time display
          pubsub.subscribe("selectAtIn", UIMod.displayAtOrIn); 
          
          // add 'color...' class to UI "at" or "in" elements
          pubsub.subscribe('selectAtIn', UIMod.selectColor)

          // "subscribe" to reset time display and future time display to 00:00
          pubsub.subscribe("selectAtIn", UIMod.resetAllTimes);
          
          // add font color to 'save' and 'reset' buttons
          pubsub.subscribe('selectAtIn', UIMod.addSaveResetColor);
          
          
          pubsub.subscribe('selectAtIn', UIMod.resetAlarmDays);

          // "publish" the event
          pubsub.emit("selectAtIn", classLabel);
  
        }

    };
       
    
    // Set AM / PM when in "at" mode 
    const selectAmPm = function(event) {
        
        // Get am or pm from UI
        let getAmPm = UIMod.retrieveAmPm(event);
        amOrPm = getAmPm
        
        // Toggle the Am/Pm toggle selector
        UIMod.moveAmPmSelector(getAmPm);
        
        // Display AM/PM selection on the main time display
        UIMod.displayAmPm(getAmPm);
        
        // Recalculate future display time
        futureTime = dataMod.calcFutureTimeAt(displayedTime, amOrPm)
        
        // Display future time
        UIMod.displayFutureTime(futureTime);
        
    };
    
    
    // Set/display hours & minutes 
    let setTimeDisplay = function(event) {
        
        if (appState) {
          // Get time/label from the sliders
          let clickedTime = UIMod.getClickedTime(event);

          // display clicked time
          UIMod.displayClickedTime(clickedTime);

          // Get displayed time as integer
          displayedTime = UIMod.getDisplayedTime(DOMElements.displayTimeBox);

          // Calc future wake-up time (either in "at" or "in" mode)
          futureTime = atOrIn === ("input-at") ? dataMod.calcFutureTimeAt(displayedTime, amOrPm) : dataMod.calcFutureTimeIn(displayedTime, amOrPm);

          // Display future time
          UIMod.displayFutureTime(futureTime);       
        }
        
    };
    
    
    // Add class to week days and update "alarmWeekDays" array with selected days 
    const selectWeekDay = function(event) {
      // update 'alarmWeekDays' array
      const alarmDays = dataMod.updateAlarmDays(event);
      
      // add color class to selected day
      UIMod.addDayClass(event);
    };
    
    
    // add alarm time to the DOM
    const clickSaveAlarm = function(event) {
      // get selected days for alarm
      const alarmDays = dataMod.getAlarmDays();
      
      // Inject alarm item into the DOM
      UIMod.addAlarmItem(atOrIn, amOrPm, displayedTime, futureTime, alarmDays);
      
      // add class to show in the alarm list 
      UIMod.showAlarmItem()
      
  /*    // reset days of the week 
      UIMod.resetAlarmDays(DOMElements.weekDays);*/
      
    };
    

    //
    const clickResetBtn = function() {
      // reset days of the week 
      UIMod.resetAlarmDays();
      
      // reset all displayed times
      UIMod.resetAllTimes();
      
    }
    
    return {
        
        init: function() {
            bindEvents();
            UIMod.displayFutureTime("00:00 AM");
            UIMod.resetMainTime();
        }
        
    }
    
})(dataModule, UIModule);


controllerModule.init();

