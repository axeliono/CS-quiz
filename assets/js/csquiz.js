var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var questionEl = document.getElementById("question-item");
var questionCounter = 0
localStorage.setItem("highScoreValue", "0");
localStorage.setItem("highScoreName", " ");
var playerScore = 0;
var timeRemaining = 30;

//array that, at each index (position), holds an object that holds the information for a question
var questionObjectArray = [{
    name: "Commonly used data types DO NOT include",
    answers: ["A. Strings","B. Booleans","C. Alerts","D. Numbers"], 
    key: 2

},
{
    name: "Arrays can contain",
    answers: ["A. Arrays","B. Numbers", "C. Objects","D. All of the above"],
    key: 3
},
{
    name: "An if/else statement must be enclosed by",
    answers: ["A. square brackets", "B. curly brackets", "C. quotes", "D. parenthesis "],
    key: 1
}]

//function to start quiz once the start button is clicked
var startQuiz = function() {
    //hides start button 
    document.getElementById("start").style.visibility = "hidden";

    //function for timer
    countdown();

    //function to create questions and answer choices on screen 
    runQuestions();
}

var countdown = function() {
    //amount of seconds given
    timeRemaining = 30;

    //reset player score every time game starts
    playerScore = 0;

    //variable to hold current question on screen
    questionCounter = 0;


    //actual timer 
    var timeInterval = setInterval(function() {

        if(timeRemaining > 0) {
            timerEl.textContent = timeRemaining + " seconds remaining";
            timeRemaining--;
            
        }
        else {
            //stops timer
            clearInterval(timeInterval);
            
            endGame();
        }

        
}, 1000);


    
    
}

//function to put questions on screen
 var runQuestions = function() {

    //create element to hold question then create 
     let questionHolderEl = document.getElementById("question-item");
     let questionShown = document.createElement("div");

     //create element to hold answer choice and create unordered list to prepare to add answer choice list elements
     let answerHolderEl = document.getElementById("answer-choices-shown");
     let answersShown = document.createElement("ul");

     //append holder for answers we create to the div element 'answer-choices-shown' that is by default in the html file
     answerHolderEl.appendChild(answersShown);
     currentQuestion = questionObjectArray[questionCounter];

     //grab question info and place object.name into div element
     currentQName = currentQuestion.name;
     questionShown.innerHTML = "<h3> " + currentQName + "</h3>";
     questionHolderEl.appendChild(questionShown);

     //add the answer choices from the array of objects
     for(i = 0; i <currentQuestion.answers.length; i++) {
       //create list-item (answer choice)
        let answerChoice = document.createElement("li");
        answerChoice.textContent = currentQuestion.answers[i];

        //add property of being the correct answer
        if(i === currentQuestion.key) {
            answerChoice.setAttribute("correct-answer", "true");
            console.log(answerChoice);
        }
        //create event listener for each answer choice 
        answerChoice.addEventListener("click", nextQuestion);

        //append list item to ul
        answersShown.appendChild(answerChoice);
        
     }


 }

//function to move to next question when click event occurs on answer choice list element
 var nextQuestion = function (event) {

    
    //element holding child elements involving all question info.
    let questionDataEl = document.getElementById("question-item");
    //element holding child elements involving all answer choice info.
    let answerDataEl = document.getElementById("answer-choices-shown");
    //increase question counter
    questionCounter++;
    //add to player score if correct answer is clicked
    if(event.target.getAttribute("correct-answer") === "true") {
        playerScore += 5;
    }

    else {
        timeRemaining -= 5;
    }
    //make the elements holding question/answer info. blank so that the runquestions function can add new elements with the new question's information
    questionDataEl.innerHTML = '';
    answerDataEl.innerHTML = '';
     //if question counter has not reached the maximum number then move to next question
     if(questionCounter < questionObjectArray.length) {

        runQuestions();
     }

     //go to endgame function to end the game 
     else {
         endGame();
     }

 }
//function to end the game by blanking page content (main tag with page-content class in html)
 var endGame = function() {
     //hide timer 
     document.getElementById("timer").style.visibility = "hidden";
     //clear screen
    let theScreen = document.getElementById("game-screen");
    theScreen.innerHTML = '';

    //create elements for the player's score and other info.

    let finalScoreEl = document.createElement("form");

     let nameInput = document.createElement("input");
     nameInput.id = "input-box";
     nameInput.setAttribute("type", "text");
     nameInput.setAttribute("name", "Player-Name");
     nameInput.setAttribute("placeholder", "Enter Name");
     nameInput.addEventListener("submit", inputPlayerInfo);

     let shownScore = document.createElement("div");
     shownScore.innerHTML = "<h3> Your Final Score is " + playerScore + " Nice Work! <br> The current high score is " + localStorage.getItem("highScoreValue") + " </h3> <br> <h4> Enter name to reset and try again <h4>";

     finalScoreEl.appendChild(shownScore);
     finalScoreEl.appendChild(nameInput);
     theScreen.appendChild(finalScoreEl);

 }

 var inputPlayerInfo = function(event) {
     event.preventDefault();
     //input player's score if higher than current high score in 
     if(localStorage.getItem("highScoreValue") < playerScore) {
        localStorage.setItem("highScoreValue", playerScore);
        localStorage.setItem("highScoreName", document.querySelector("input[name='Player-Name']").value);
     }
     location.reload();


    

 }

 //event listener for clicking start button
startBtn.addEventListener("click", startQuiz);

