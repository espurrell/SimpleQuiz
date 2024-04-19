const questions = [
    {
        question: "Which is the largest animal in th world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },{
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },{
        question: "Which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true},
        ]
    },{
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;  
    nextButton.innerHTML = "Next";  
    showQuestion();
};

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //code to display answers

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button'); //creating button
        button.innerHTML = answer.text; //adding text to button
        button.classList.add('btn'); //adding class to button
        answerButtons.appendChild(button); //adding button to answerButton div
        if(answer.correct){
            button.dataset.correct = answer.correct; //adding data attribute to button
        }
        button.addEventListener('click', selectAnswer); //adding event listener to button
    });
};

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==='true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => { //disabling all buttons
        if(button.dataset.correct === 'true'){ //highlighting correct answer
            button.classList.add('correct'); // adding class to correct answer
        }
        button.disabled = true; //  disabling all buttons
    });
    nextButton.style.display = 'block'; //displaying next button
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${ questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion(); 
    }else{
        showScore()
    }
};

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
}else{
    startQuiz();
}
});



startQuiz();
