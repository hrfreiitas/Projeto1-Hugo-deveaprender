// select DOM element 
const quizForm = document.querySelector('#quizForm');
const startButton = document.querySelector('#startButton');
const quizImage = document.querySelector('#quizImage img');
const userAnswer = document.getElementById('user-answer');
const submitAnswer = document.querySelector('#submit-answer');
const countdownElement = document.getElementById('countdown');
const playerScore = document.getElementById('score');


let questionIndex = 0;

// define the quiz question 
const quizQuestions = [
  {
    question: 'Who is it ?',
    imageUrl:
      'https://staticc.sportskeeda.com/editor/2023/04/ef6a2-16823161722165-1920.jpg',
    correctAnswer: 'messi',
  },
  {
    question: 'Who is this?',
    imageUrl:
      'https://phantom-marca.unidadeditorial.es/b5dccb1db0e6d14bbde3aa68dce3aee0/resize/1320/f/jpg/assets/multimedia/imagenes/2022/12/15/16711022218501.jpg',
    correctAnswer: 'neymar',
  },
  {
    question: 'Who is it ?',
    imageUrl:
      'https://phantom-marca.unidadeditorial.es/093efd1febb5a36e456a16684609b9e3/resize/1320/f/jpg/assets/multimedia/imagenes/2022/07/12/16576417132626.jpg',
    correctAnswer: 'cristiano',
  },
  {
    question: 'Who is it?',
    imageUrl:
      'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9dccdb038015dedb/60db993b5543520fcbc22de0/3f473b3fbd89463b836a42549292a536d37f7cd9.jpg?auto=webp&format=pjpg&width=3840&quality=60',
    correctAnswer: 'pele',
  },
  {
    question: 'Who is it?',
    imageUrl:
      'https://www.lance.com.br/files/article_main/uploads/2021/09/14/6140ff4af0f6a.jpeg',
    correctAnswer: 'ronaldinho',
  },
  {
    question: 'Who is it ?',
    imageUrl:
      'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt1926021b5334f5e1/63c24f63a9748f582372fe06/Casemiro.jpg',
    correctAnswer: 'casemiro',
  },
  {
    question: 'Who is it?',
    imageUrl:
      'https://www.lance.com.br/files/article_main/uploads/2022/10/05/633e3f826998e.jpeg',
    correctAnswer: 'hulk',
  },
  {
    question: 'Who is it ?',
    imageUrl:
      'https://cdn.espn.com.br/image/wide/622_f82c860c-1ec0-31a2-8244-93a952b9a21b.jpg',
    correctAnswer: 'ronaldo',
  },
  {
    question: 'Who is it?',
    imageUrl:
      'https://www.ofutebolero.com.br/__export/1678311881187/sites/elfutboleromx/img/2023/03/08/adriano-imperador-11052021140738394.jpeg_1528981544.jpeg',
    correctAnswer: 'adriano',
  },
  {
    question: 'Who is it?',
    imageUrl:
      'https://www.nacaofutboleira.com.br/__export/1681757100108/sites/nacionfutbolbr/img/2023/04/17/zinedine_zidane.jpg_658443643.jpg',
    correctAnswer: 'zidane',
  },
  {
    question: 'Who is it ?',
    imageUrl:
      'https://e0.365dm.com/22/01/768x432/skysports-mohamed-salah-liverpool_5638215.jpg?20220111105345',
    correctAnswer: 'mohamed',
  },
];
// define the quiz Answers
const correctAnswers = [
  'messi',
  'neymar',
  'cristiano',
  'pele',
  'ronaldinho',
  'casemiro',
  'hulk',
  'ronaldo',
  'adriano',
  'zidane',
  'mohamed',
];

let seconds = 10;

console.log(correctAnswers, quizQuestions);

// hidde the quizForm and submitAnswer
quizForm.style.display = 'none';
submitAnswer.style.display = 'none';

// Define an index to control the order of questions
function startQuiz(isFirstClicked = null) {
  
  // set index to zero
  if (isFirstClicked) {   
    questionIndex = 0;
    playerScore.innerHTML = "";
  }  

  // Get next question in array order
  const currentQuestion = quizQuestions[questionIndex];
  // Increment the index for the next time the function is called
  questionIndex++;
  // Define the question in the form
  quizForm.querySelector('label').textContent = currentQuestion.question;
  // show the image with the question
  if (currentQuestion.imageUrl) {
    quizImage.src = currentQuestion.imageUrl;
    quizImage.style.display = 'block';
  } else {
    quizImage.style.display = 'none';
  }

  // Displays form and submit button
  quizForm.style.display = 'block';
  submitAnswer.style.display = 'block';
  startButton.style.display = 'none';
}

function keepValueLocalStorage() {
  const inputValue = userAnswer.value.trim().toLowerCase();

  // Retrieves the JSON string from LocalStorage and turns it into a JS array
  let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

  // Adds the new value to the array
  userAnswers.push(inputValue);

  // Convert an array back to a JSON string and store in LocalStorage
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  // Check for userAnswer and add to a score 
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 1;
    }
  });
  
  playerScore.innerHTML = `Your score is: ${score}/11`;

  userAnswer.value = '';
  startQuiz(false);
}
// Define the countdown 
function countdown() {
  let seconds = 60;
  countdownElement.innerHTML = seconds;
  const interval = setInterval(() => {
    seconds--;
    countdownElement.innerHTML = seconds;
    if (seconds === 0) {
      clearInterval(interval);
      quizForm.style.display = 'none';
      startButton.style.display = 'block';
      localStorage.clear();
    }
  }, 1000);
}

startButton.addEventListener('click', countdown);

