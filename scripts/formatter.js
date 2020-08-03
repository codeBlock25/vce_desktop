const electron = require('electron')
const app = electron.remote
const dialog = app.dialog
const {
    BrowserWindow
} = require('electron').remote
const win = app.getCurrentWindow()
const localForage = require('localforage')
const mainBody = document.getElementById('Body')
const path = require('path')
const former = document.getElementById('former')
const fs = require('fs')

var set = 0
var count = 0
var data = []
var questionblock = []
localForage.getItem('data').then(async result => {
    var mark_down = []
    data = result
    result.length <= 1 || result === null ?
        '' :
        result.split('\n').forEach(ment => {
            mark_down.push(ment)
        })
    var meme = new Promise((resolve, reject) => {
        try {
            var questionblocky = []
            for (let i = 0; i < mark_down.length; i++) {
                if (questionblocky.length > set + 1) {
                    // console.log(questionblock.length, set);
                    set++
                }
                if (/^\d/.test(mark_down[i]) === true) {
                    question = mark_down[i]
                    questionblocky.push({
                        question: {
                            mark: 5,
                            question: mark_down[i],
                        },
                        options: [],
                    })
                }
                if (/^[a-d]|[A-D]\./im.test(mark_down[i]) === true) {
                    if (count >= 4) {
                        count = 0
                    } else {
                        // console.log(mark_down[i]);
                        if (
                            /^\b(\w*answer\w*)\b/im.test(mark_down[i]) === true
                        ) {
                            questionblocky[set].options.push({
                                op: '',
                                correct: false,
                            })
                        } else {
                            questionblocky[set].options.push({
                                op: mark_down[i],
                                correct: false,
                            })
                        }
                        count++
                    }
                }
            }
            resolve(questionblocky)
        } catch (error) {
            reject(error)
        }
    })
    await meme.then(result => {
        questionblock = result
    })
    var counter = 0
    for (line of mark_down) {
        // console.log(/^(answer:)/.test(line.toLowerCase()))
        if (/^(answer:)/.test(line.toLowerCase())) {
            if (
                line
                .toLowerCase()
                .slice(-2)
                .includes('d')
            ) {
                questionblock[counter].options[3] ?
                    (questionblock[counter].options[3].correct = true) :
                    ''
            } else if (
                line
                .toLowerCase()
                .slice(-2)
                .includes('a')
            ) {
                questionblock[counter].options[0] ?
                    (questionblock[counter].options[0].correct = true) :
                    ''
            } else if (
                line
                .toLowerCase()
                .slice(-2)
                .includes('a')
            ) {} else if (
                line
                .toLowerCase()
                .slice(-2)
                .includes('b')
            ) {
                questionblock[counter].options[1] ?
                    (questionblock[counter].options[1].correct = true) :
                    ''
            } else if (
                line
                .toLowerCase()
                .slice(-2)
                .includes('c')
            ) {
                questionblock[counter].options[2] ?
                    (questionblock[counter].options[2].correct = true) :
                    ''
            } else {
                console.log('noop')
            }
            counter++
        }
    }
    localForage.setItem('questions', questionblock).then(() => {
        questionblock.forEach(questione => {
            let block = document.createElement('div')
            console.log(questione.options)
            block.classList.add('plan')
            block.innerHTML = `
              <div class="question">
                <span class="mark" contenteditable="true">${questione.question
                    .mark || ''}</span>
                <span
                  class="ques"
                  contenteditable="true"
                  spellcheck="true"
                  aria-placeholder="stuff"
                  title="Question"
                >${questione.question.question}
                </span>
              </div>
              <div class="ans">
                <div class=${
                    questione.options[0]
                        ? questione.options[0].correct === true
                            ? `"answer correct"`
                            : `"answer"`
                        : 'answer'
                } contenteditable="true">${
                questione.options[0] ? questione.options[0].op : ''
            }</div>
                <div class=${
                    questione.options[1]
                        ? questione.options[1].correct === true
                            ? `"answer correct"`
                            : `"answer"`
                        : 'answer'
                } contenteditable="true">${
                questione.options[1] ? questione.options[1].op : ''
            }</div>
                <div class=${
                    questione.options[2]
                        ? questione.options[2].correct === true
                            ? `"answer correct"`
                            : `"answer"`
                        : 'answer'
                } contenteditable="true">${
                questione.options[2] ? questione.options[2].op : ''
            }</div>
                <div class=${
                    questione.options[3]
                        ? questione.options[3].correct === true
                            ? `"answer correct"`
                            : `"answer"`
                        : 'answer'
                } contenteditable="true">${
                questione.options[3] ? questione.options[3].op : ''
            }</div>
              </div>`
            former.appendChild(block)
        })
    })
})

function nextWindow(linkURL) {
    let newWin1 = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    // newWin1.webContents.openDevTools();
    newWin1
        .loadURL(
            `file://${path.join(__dirname, linkURL || '../view/editor.html')}`
        )
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
    win.close()
}
let counted = 0
mainBody.addEventListener('click', evt => {
    if (evt.target.className === 'edit') {
        // nextWindow();
        win.loadURL(`file://${path.join(__dirname, '../view/editor.html')}`)
    }
    if (evt.target.className === 'convert') {
        localForage
            .setItem('questions', {
                question: questionblock,
                data: data
            })
            .then(i => {
                console.log('done')
                nextWindow('../view/account.html')
            })
    }
    if (
        evt.target.className === 'back' ||
        evt.target.parentElement.className === 'back'
    ) {
        var plans = document.querySelectorAll('.plan')
        if (counted <= 0) {
            counted = 0
        } else {
            counted = counted - 1
        }

        plans.forEach(plan => {
            plan.style.opacity = `0`
            plan.style.zIndex = `1`
        })
        plans[counted].style.opacity = `1`
        plans[counted].style.zIndex = `100`
    }
    if (
        evt.target.className === 'forward' ||
        evt.target.parentElement.className === 'forward'
    ) {
        var plans = document.querySelectorAll('.plan')
        if (counted >= plans.length - 1) {
            counted = counted
        } else {
            counted = counted + 1
        }

        plans.forEach(plan => {
            plan.style.opacity = `0`
            plan.style.zIndex = `1`
        })
        plans[counted].style.opacity = `1`
        plans[counted].style.zIndex = `100`
    }
})