import {quizData} from './data.js'

const questionEl  = document.getElementById('questions')
 const optionEl  = document.getElementById('opt-container')
 const submitBtn = document.getElementById('submit')
 const resultEl   = document.getElementById('result')
 const scoreEl    = document.getElementById('score')
 const restartBtn = document.getElementById('restart-btn')
let currentIndex = 0;
let  score = 0;

function loadQuestion() {
    const currentQuiz = quizData[currentIndex]

    questionEl.innerHTML = currentQuiz.question;

     optionEl.innerHTML = "";

    ["a","b","c","d"].forEach((key) => {
        // create a wrapper element
        const wrapperEl = document.createElement('div')
        wrapperEl.classList.add('option')


        // create a input type-radio id-key value = key
        const radio = document.createElement('input')
        radio.type = radio;
        radio.id  = key;
        radio.name = 'answer';
        radio.value = key;

        // create a label htmlfor-key textContent-currentQuiz[key]
        const label = document.createElement('label')
        label.htmlFor = key;
        label.textContent = currentQuiz[key]
        // append input and label to wrapper element and wrapper to optionEl

        wrapperEl.appendChild(radio);
        wrapperEl.appendChild(label);
        optionEl.appendChild(wrapperEl)
     });
    
}


function submitAnswer() {
    //select the sleceted radio
    
     
     
}


function showResult() {
    
}

function restartQuiz() {
    console.log('restart quiz is clicked');
    
}


submitBtn.addEventListener('click',submitAnswer);
restartBtn.addEventListener('click',restartQuiz);
