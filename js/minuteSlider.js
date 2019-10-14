export const moveMinuteSlider = () => {
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
        */
    
    })
};