var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");

var countdown = function() {
    console.log("startClicked");
    var timeRemaining = 75;

    var timeInterval = setInterval(function() {

        if(timeRemaining > 0) {
            timerEl.textcontent = timeRemaining + " seconds remaining";
            timeRemaining--;
            console.log(timeRemaining);
        }
        else {
            clearInterval(timeInterval);
            //put function to send info for highscore
        }
}, 1000);
}



startBtn.addEventListener("click", countdown());
