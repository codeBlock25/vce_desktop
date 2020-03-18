const electron = require('electron')
const app = electron.remote
const QuestionPlains = document.querySelectorAll('.QuestionsPlan .plan')
// const QuestionPlain = document.querySelector(".QuestionsPlan .plan");
const QuestionField = document.querySelector('.QuestionsPlan')
const addQuestionBlockBtn = document.getElementById('questionMarker')
const saveFootMark = document.getElementById('saveBtn')
const localForage = require('localforage')
const saverBtn = document.getElementById('save-btn')
const plain = document.getElementById('plain')

class Question_and_answer {
    constructor(
        mark,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctA,
        correctB,
        correctC,
        correctD,
        imageBinary
    ) {
        this.mark = mark
        this.question = question
        this.optionA = optionA
        this.optionB = optionB
        this.optionC = optionC
        this.optionD = optionD
        this.correctA = correctA
        this.correctB = correctB
        this.correctC = correctC
        this.correctD = correctD
        this.imageBinary = imageBinary === '' ? '' : new Buffer(imageBinary)
    }
    returnObject() {
        return new Object({
            question: {
                mark: this.mark,
                question: this.question,
            },
            image: this.imageBinary,
            options: [
                {
                    op: this.optionA,
                    correct: this.correctA,
                },
                {
                    op: this.optionB,
                    correct: this.correctB,
                },
                {
                    op: this.optionC,
                    correct: this.correctC,
                },
                {
                    op: this.optionD,
                    correct: this.correctD,
                },
            ],
        })
    }
}

var questionRack = []
const questionCreator = () => {
    const QuestionPlainF = document.querySelectorAll('.QuestionsPlan .plan')
    QuestionPlainF.forEach(plan => {
        var a =
            plan.lastElementChild.firstElementChild.className ===
            'answer correct'
                ? true
                : false
        var b =
            plan.lastElementChild.firstElementChild.nextElementSibling
                .className === 'answer correct'
                ? true
                : false
        var c =
            plan.lastElementChild.firstElementChild.nextElementSibling
                .nextElementSibling.className === 'answer correct'
                ? true
                : false
        var d =
            plan.lastElementChild.firstElementChild.nextElementSibling
                .nextElementSibling.nextElementSibling.className ===
            'answer correct'
                ? true
                : false
        var img =
            plan.firstElementChild.nextElementSibling.firstElementChild.getAttribute(
                'data-src'
            ) ?? ''
        questionRack = [
            ...questionRack,
            new Question_and_answer(
                parseInt(
                    plan.firstElementChild.firstElementChild.innerText,
                    10
                ),
                plan.firstElementChild.lastElementChild.innerText,
                plan.lastElementChild.firstElementChild.innerText,
                plan.lastElementChild.firstElementChild.nextElementSibling.innerText,
                plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText,
                plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                a,
                b,
                c,
                d,
                img
            ).returnObject(),
        ]
    })
}

const addAnswerAbilty = () => {
    const QuestionP = document.querySelectorAll('.QuestionsPlan .plan')
    for (let i = 0; i < QuestionP.length; i++) {
        QuestionP[i].addEventListener('dblclick', evt => {
            evt.currentTarget.lastElementChild.firstElementChild.classList.remove(
                'correct'
            ),
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.classList.remove(
                    'correct'
                ),
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.remove(
                    'correct'
                ),
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                    'correct'
                )
            if (evt.target.classList[0].includes('answer')) {
                evt.target.classList.add('correct')
            }
        })
    }
}

let observer = new MutationObserver(data => {
    addAnswerAbilty()
})
observer.observe(QuestionField, {
    childList: true,
    characterDataOldValue: true,
})

addQuestionBlockBtn.addEventListener('click', () => {
    let block = document.createElement('div')
    block.classList.add('plan')
    block.innerHTML = `
          <div class="question">
            <span class="mark" contenteditable="true"></span>
            <span
              class="ques"
              contenteditable="true"
              spellcheck="true"
              aria-placeholder="stuff"
              title="Question"
            >
            </span>
          </div>
          <div class='image'>
            <img src='' class='img'>
            <input type="file" accept="image/*" id="imgPicker" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker'>add image</label>
          </div>
          <div class="ans">
            <div class="answer" contenteditable="true"></div>
            <div class="answer correct" contenteditable="true"></div>
            <div class="answer" contenteditable="true"></div>
            <div class="answer" contenteditable="true"></div>
          </div>`
    QuestionField.appendChild(block)
})

saveFootMark.addEventListener('click', () => {
    questionCreator()
    localForage.setItem('questions', questionRack).then(i => {
        console.log('done')
        localForage.setItem('dataStory', plain.innerText)
    })
})
saverBtn.addEventListener('click', () => {
    questionCreator()
    localForage.setItem('questions', questionRack).then(i => {
        console.log('done')
        localForage.setItem('dataStory', plain.innerText)
    })
})
QuestionPlains.forEach(QuestionPlain => {
    QuestionPlain.addEventListener('dblclick', evt => {
        evt.currentTarget.lastElementChild.firstElementChild.classList.remove(
            'correct'
        ),
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.classList.remove(
                'correct'
            ),
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.remove(
                'correct'
            ),
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                'correct'
            )
        if (evt.target.classList[0].includes('answer')) {
            evt.target.classList.add('correct')
        }
    })
})
