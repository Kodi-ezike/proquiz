const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));   //convert the choices to an array
const questionCounterText = document.getElementById('question-counter');
const scoreText = document.getElementById('score');
//const finalAnswer = document.getElementById('final-answer');

console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []
// fetch('questions.json')
//     .then (res =>{
//       // console.log(res)
//       return res.json();
//     })
//     .then(loadedQuestions =>{
//       console.log(loadedQuestions);
//       questions = loadedQuestions;
//       startGame();
//     })
//     .catch (err =>{
//       console.log(err);
//     });

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then (res =>{
      // console.log(res)
      return res.json();
    })
    .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
          );

          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });

          return formattedQuestion;
      });
      startGame();
  })
    .catch (err =>{
      console.log(err);
    });

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];   //...using spread operators
    console.log(availableQuestions);
    getNewQuestions();
}

getNewQuestions=()=>{
    if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS){
      localStorage.setItem('mostRecentScore', score);
        //return to the end page

        return window.location.assign('/end.html');
       
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;
    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);  //to give a random question from the array
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice'+ number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;
        //console.log(e.target);

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //console.log(selectedAnswer == currentQuestion.answer); // to determine if the answers are correct

        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //   const classToApply = 'correct';
        // };
        
        
        
        //or

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
       
        console.log(classToApply);
        if(classToApply === 'correct'){
          incrementScore(CORRECT_BONUS);
          
        };
       
          // selectedChoice.parentElement.setAttribute('class', 'classToApply');
          
        
        selectedChoice.parentElement.classList.add(classToApply);
        selectedChoice.parentElement.setAttribute('class', 'classToApply');

        setTimeout( () => {
          selectedChoice.parentElement.classList.remove(classToApply);

          getNewQuestions();
        }, 1000);
        
    });
});
incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}




