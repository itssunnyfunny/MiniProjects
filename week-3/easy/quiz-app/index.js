import {quizData} from './data.js'



const questionEl  = document.getElementById('questions')
 const optionEl  = document.getElementById('optn-container')
 const submitBtn = document.getElementById('submit')
 const resultEl   = document.getElementById('result')
 const scoreEl    = document.getElementById('score')
 const restartBtn = document.getElementById('restart-btn')
let currentIndex = 0;
let  score = 0;

function loadQuestion() {
    const currentQuiz = quizData[currentIndex]

    questionEl.textContent = currentQuiz.question;

     optionEl.innerHTML = "";

    ["a","b","c","d"].forEach((key) => {
       
        const wrapperEl = document.createElement('div')
          wrapperEl.classList.add('option')


       
        const radio = document.createElement('input')
        radio.type = "radio";
        radio.id  = key;
        radio.name = 'answer';
        radio.value = key;

        const label = document.createElement('label')
        label.htmlFor = key;
        label.textContent = currentQuiz[key]
       

        wrapperEl.appendChild(radio);
        wrapperEl.appendChild(label);

        optionEl.appendChild(wrapperEl);
     });
    
}


function submitAnswer() {
   
    const selected = optionEl.querySelector("input[name='answer']:checked")
    
   
     if (!selected) {
        alert('please select a Option');
        return;
     }

     
     const answer = selected.value;
     if (answer === quizData[currentIndex].correct) {
        score++;
     }
     currentIndex++;

  
     if (currentIndex < quizData.length) {
        loadQuestion()
     } else {
       showResult() 
     }
     
     
}


function showResult() {

    questionEl.classList.add('hidden');

    optionEl.classList.add('hidden');
    // optionEl.innerHTML = "";

    submitBtn.classList.add('hidden');

    resultEl.classList.remove('hidden');

    scoreEl.textContent = `Your Score ${score}/${quizData.length}`
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;

    resultEl.classList.add('hidden');
    
    questionEl.classList.remove('hidden');
    optionEl.classList.remove('hidden');
    submitBtn.classList.remove('hidden');
  
    loadQuestion()
    
}


submitBtn.addEventListener('click',submitAnswer);
restartBtn.addEventListener('click',restartQuiz);

loadQuestion()

