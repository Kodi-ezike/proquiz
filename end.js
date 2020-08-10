const finalScore = document.getElementById('overall');
// const feedback = document.getElementById('feedback');
// const MAX_QUESTIONS = 3;
// const selectedChoice = e.target;
// const selectedAnswer = selectedChoice.dataset['number'];
// const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore + '%';
