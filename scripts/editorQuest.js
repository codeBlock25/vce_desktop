const electron = require('electron')
const app = electron.remote
const QuestionPlains = document.querySelectorAll('.QuestionsPlan .plan')
// const QuestionPlain = document.querySelector(".QuestionsPlan .plan");
const QuestionField = document.querySelector('.QuestionsPlan')
const addQuestionBlockBtn = document.getElementById('questionMarker')
const addQuestionImageBlockBtn = document.getElementById('questionImageMarker')
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
        optionE,
        correctA,
        correctB,
        correctC,
        correctD,
        correctE,
        imageBinary,
        solution,
        type
    ) {
        this.mark = mark
        this.question = question
        this.optionA = optionA
        this.optionB = optionB
        this.optionC = optionC
        this.optionD = optionD
        this.optionE = optionE
        this.correctA = correctA
        this.correctB = correctB
        this.correctC = correctC
        this.correctD = correctD
        this.correctE = correctE
        this.solution = solution
        this.type = type
        this.imageBinary = imageBinary === '' ? '' : imageBinary
    }
    returnObject() {
        return new Object({
            question: {
                mark: this.mark,
                question: this.question,
            },
            solution: this.solution,
            image: this.imageBinary,
            type: this.type,
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
                {
                    op: this.optionE,
                    correct: this.correctE,
                },
            ],
        })
    }
}

var questionRack = []
const questionCreator = () => {
    const QuestionPlainF = document.querySelectorAll('.QuestionsPlan .plan')
    QuestionPlainF.forEach((plan) => {
        // console.log(plan.lastElementChild.firstElementChild.lastElementChild)
        if (plan.lastElementChild.classList.contains('img')) {
            var a = plan.lastElementChild.firstElementChild.lastElementChild.classList.contains(
                'correct'
            )
            var b = plan.lastElementChild.firstElementChild.nextElementSibling.lastElementChild.classList.contains(
                'correct'
            )
            var c = plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.classList.contains(
                'correct'
            )
            var d = plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.contains(
                'correct'
            )
            var e = plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.contains(
                'correct'
            )
            var img =
                plan.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.getAttribute(
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
                    plan.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.getAttribute(
                        'data-src'
                    ) ?? null,
                    plan.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.getAttribute(
                        'data-src'
                    ) ?? null,
                    plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.getAttribute(
                        'data-src'
                    ) ?? null,
                    plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.getAttribute(
                        'data-src'
                    ) ?? null,
                    plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.getAttribute(
                        'data-src'
                    ) ?? null,
                    a,
                    b,
                    c,
                    d,
                    e,
                    img,
                    plan.firstElementChild.nextElementSibling.innerText,
                    'image'
                ).returnObject(),
            ]
        } else {
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
            var e =
                plan.lastElementChild.firstElementChild.nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .className === 'answer correct'
                    ? true
                    : false
            var img =
                plan.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.getAttribute(
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
                    plan.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    a,
                    b,
                    c,
                    d,
                    e,
                    img,
                    plan.firstElementChild.nextElementSibling.innerText,
                    'text'
                ).returnObject(),
            ]
        }
    })
}

const addAnswerAbilty = () => {
    const QuestionP = document.querySelectorAll('.QuestionsPlan .plan')
    for (let i = 0; i < QuestionP.length; i++) {
        QuestionP[i].addEventListener('dblclick', (evt) => {
            if (evt.currentTarget.lastElementChild.classList.contains('img')) {
                evt.currentTarget.lastElementChild.firstElementChild.lastElementChild.classList.remove(
                    'correct'
                )
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.lastElementChild.classList.remove(
                    'correct'
                )
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                    'correct'
                )
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                    'correct'
                )
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                    'correct'
                )
                if (evt.target.classList[0].includes('imgLabel')) {
                    evt.target.classList.add('correct')
                }
            } else {
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
                evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                    'correct'
                )
                if (evt.target.classList[0].includes('answer')) {
                    evt.target.classList.add('correct')
                }
            }
        })
    }
}

let observer = new MutationObserver((data) => {
    addAnswerAbilty()
})
observer.observe(QuestionField, {
    childList: true,
    characterDataOldValue: true,
})

addQuestionImageBlockBtn.addEventListener('click', () => {
    let rand = Math.ceil(Math.random() * 976531764)
    let rand1 = Math.ceil(Math.random() * 976531764)
    let rand2 = Math.ceil(Math.random() * 976531764)
    let rand3 = Math.ceil(Math.random() * 976531764)
    let rand4 = Math.ceil(Math.random() * 976531764)
    let rand5 = Math.ceil(Math.random() * 976531764)
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
            <span
              class="solu"
              contenteditable="true"
              spellcheck="true"
              aria-placeholder="stuff"
              title="Solution"
            >
            </span>
          <div class='image'>
            <img src='' class='img'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand}'>add image</label>
          </div>
          <div class="ans img">
          <div class='image_answer'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand1}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand1}'></label>
            <span class='imgLabel'>Add image</span>
          </div>
          <div class='image_answer correct'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand2}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand2}'></label>
            <span class='imgLabel correct'>Add image</span>
          </div>
          <div class='image_answer'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand3}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand3}'></label>
            <span class='imgLabel'>Add image</span>
          </div>
          <div class='image_answer'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand4}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand4}'></label>
            <span class='imgLabel'>Add image</span>
          </div>
          <div class='image_answer'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand5}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand5}'></label>
            <span class='imgLabel'>Add image</span>
          </div>
        <span class='delete'>remove block</span>
          </div>`
    QuestionField.appendChild(block)
})
addQuestionBlockBtn.addEventListener('click', () => {
    let rand = Math.ceil(Math.random() * 976531764)
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
            <span
              class="solu"
              contenteditable="true"
              spellcheck="true"
              aria-placeholder="stuff"
              title="Solution"
            >
            </span>
          <div class='image'>
            <img src='' class='img'>
            <input type="file" accept=".png, .jpg, .jpeg" id="imgPicker${rand}" style="display: none;" maxlength='1' multiple='false'>
            <label class='imgBtn' for='imgPicker${rand}'>add image</label>
          </div>
          <div class="ans">
            <div class="answer" contenteditable="true"></div>
            <div class="answer correct" contenteditable="true"></div>
            <div class="answer" contenteditable="true"></div>
            <div class="answer" contenteditable="true"></div>
          <div class="answer" contenteditable="true"></div>
        <span class='delete'>remove block</span>
          </div>`
    QuestionField.appendChild(block)
})

saveFootMark.addEventListener('click', () => {
    questionCreator()
    localForage.setItem('questions', questionRack).then((i) => {
        localForage.setItem('dataStory', plain.innerText)
    })
})
saverBtn.addEventListener('click', () => {
    questionCreator()
    localForage.setItem('questions', questionRack).then((i) => {
        console.log('done')
        localForage.setItem('dataStory', plain.innerText)
    })
})
QuestionPlains.forEach((QuestionPlain) => {
    QuestionPlain.addEventListener('dblclick', (evt) => {
        if (evt.currentTarget.lastElementChild.classList.contains('img')) {
            evt.currentTarget.lastElementChild.firstElementChild.lastElementChild.classList.remove(
                'correct'
            )
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.lastElementChild.classList.remove(
                'correct'
            )
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                'correct'
            )
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                'correct'
            )
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.remove(
                'correct'
            )
            if (evt.target.classList[0].includes('imgLabel')) {
                evt.target.classList.add('correct')
            }
        } else {
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
            evt.currentTarget.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
                'correct'
            )
            if (evt.target.classList[0].includes('answer')) {
                evt.target.classList.add('correct')
            }
        }
    })
})
