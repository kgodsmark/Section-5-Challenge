  function buildQuiz() {
    
    var output = []; //to store the HTML output

        myQuestions.forEach((currentQuestion, questionNumber) => {
            var answers = []; //to store the list of answer choices
            
            for (letter in currentQuestion.answers) { //for each available answer
            answers.push( //add an HTML radio button
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
           );}

          output.push( // add this question and its answers to the output
         `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
          );
       });

    quizContainer.innerHTML = output.join(""); //combine output list into one string of HTML and put it on the page
  }

  function showResults() {

    var answerContainers = quizContainer.querySelectorAll(".answers"); //gather answer containers from our quiz

    var numCorrect = 0; //track user's answers

    myQuestions.forEach((currentQuestion, questionNumber) => { //find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++; //add to the number of correct answers
        answerContainers[questionNumber].lastElementChild.style.color = "green" //color answers green

          if(questionNumber===0) {
          let addText = document.createTextNode(" >> Quelle histoire!");
          answerContainers[questionNumber].lastElementChild.appendChild(addText);
          }
          if(questionNumber===1) {
          let addText = document.createTextNode(" >> Each banana is known as a finger");
          answerContainers[questionNumber].lastElementChild.appendChild(addText);
          }
          if(questionNumber===2) {
          let addText = document.createTextNode(" >> In 1995");
          answerContainers[questionNumber].lastElementChild.appendChild(addText);
          }
          if(questionNumber===4) {
            var beeImage = document.createElement("img");
            beeImage.setAttribute("src", "images/bee.png");
            beeImage.setAttribute("height", "100");
            beeImage.setAttribute("width", "100");
            beeImage.setAttribute("alt", "Bee");
            beeImage.id ="bee-to-bounce";
            beeImage.style.position ="relative";
            answerContainers[questionNumber].lastElementChild.appendChild(beeImage);
            
            $("#bee-to-bounce").ready(function(){
            $("#bee-to-bounce").animate({left: "100%"}, 2000);
            $("#bee-to-bounce").animate({left: "-50%"}, 1000);
            });
          }
  
      } else {  
        answerContainers[questionNumber].style.color = "red"; //color incorrect answers red
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;//show number of correct answers out of total
    
    if(numCorrect===myQuestions.length) {
            var tick = document.createElement("img");
            tick.setAttribute("src", "images/tick.png");
            tick.setAttribute("height", "100");
            tick.setAttribute("width", "100");
            tick.setAttribute("alt", "Tick");
            tick.id ="tick-to-expand";
            tick.style.position ="absolute";
            document.getElementById("results").appendChild(tick);
    } else {
          var addButton = document.createElement("button");
          addButton.id = "fullReset";
          addButton.textContent = "Try Again";
          document.getElementById("results").appendChild(addButton);
          }
            document.getElementById("fullReset").onclick = function() {
            location.reload();
            };
}

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var myQuestions = [
    {
      question: "From which country does the croissant orignate?",
      answers: {
        a: "Germany",
        b: "France",
        c: "Austria"
      },
      correctAnswer: "c"
    },
    {
      question: "Bananas grow in clusters. What are these clusters known as?",
      answers: {
        a: "Bunches",
        b: "Gangs",
        c: "Hands"
      },
      correctAnswer: "c"
    },
    {
      question: "What was the first food to be grown in space?",
      answers: {
        a: "Lemons",
        b: "Apples",
        c: "Potatoes",
      },
      correctAnswer: "c"
    },
     {
      question: "When did Heinz Baked Beans first sell in the UK?",
      answers: {
        a: "1931",
        b: "1901",
        c: "1886"
      },
      correctAnswer: "c"
    },
    {
      question: "In order to produce 500g of honey, how many flowers must a colony of bees visit?",
      answers: {
        a: "200 flowers",
        b: "2,000 flowers",
        c: "2 million flowers"
      },
      correctAnswer: "c"
    }     
  ];

  
  buildQuiz(); //display quiz

  submitButton.addEventListener("click", showResults); //on submit, show results


 



