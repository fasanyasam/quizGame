const startButton = document.getElementById("start-btn")
const resultButton = document.getElementById("result-btn")
const nextButton = document.getElementById("next-btn")
var resultsContainer = document.getElementById('results');
const questionContainerElement = document.getElementById("question-container")

const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
let shuffledQuestions, currentQuestionIndex, score = 0


startButton.addEventListener("click", start)

resultButton.addEventListener("click", showScores)

nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})

function start() {
    console.log("started")
    resultsContainer.innerHTML = ""
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    nextQuestion()
}


function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question, correct) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    //if answer is correct
    if (correct) {
        score++
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        resultButton.innerText = "Result"
        resultButton.classList.add("show")
        resultButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

//show results
function showScores() {
    resultsContainer.innerHTML = "Your result is " + score
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
    resultButton.classList.add("hide")
    resultsContainer.classList.add("show")
};

const questions = [
    {
        question: 'Which is the largest vegetable?',
        answers: [
            { text: 'pepper', correct: false },
            { text: 'pumpkin', correct: true },
            { text: 'carrot', correct: false },
            { text: 'cucumber', correct: false }
        ]
    },
    {
        question: 'Which vegetable can be bitter?',
        answers: [
            { text: 'carrot', correct: false },
            { text: 'mango', correct: false },
            { text: 'bitter-leaf', correct: true },
            { text: 'pepper', correct: false },
        ]
    },
    {
        question: 'What are wide onions called?',
        answers: [
            { text: 'giant onions', correct: false },
            { text: 'majenta', correct: false },
            { text: 'beers leak', correct: true },
            { text: 'wild onions', correct: false }
        ]
    },
    {
        question: 'what is another name for passion fruit?',
        answers: [
            { text: 'orange', correct: false },
            { text: 'maracuya', correct: true },
            { text: 'gabbage', correct: false },
            { text: 'pumpkin', correct: false }
        ]
    },
    {
        question: 'Who is the President of Nigeria?',
        answers: [
            { text: 'Muhamadu Buhari', correct: true },
            { text: 'Sanusi Lamido', correct: false },
            { text: 'Ekong Udoma', correct: false },
            { text: 'Yerima Shattima', correct: false }
        ]
    }
]
