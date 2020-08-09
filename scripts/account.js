var _form = document.querySelector('form')
var { BrowserWindow } = require('electron').remote
var app = require('electron').remote
const dialog = app.dialog
const fs = require('fs')
var path = require('path')
const win = app.getCurrentWindow()
const localForage = require('localforage')
const cancel = document.querySelector('.btn.canel')
const crypto = require('crypto')
// cryptorize

function getCipherKey(password) {
    return crypto.createHash('sha256').update(String(password)).digest('base64')
}

function encrypt(text, password) {
    console.log(text, password)
    const initVect = crypto.randomBytes(16)
    const key = getCipherKey(password)

    const cipher = crypto.createCipheriv('aes-256-ctr', key, initVect)
    const cipherText = cipher.update(new Buffer(text)).digest()

    return initVect + cipherText

    // Create an initialization vector
    // const iv = crypto.randomBytes(16);
    // // Create a new cipher using the algorithm, key, and iv
    // const cipher = crypto.createCipheriv(algorithm, key, iv);
    // // Create the new (encrypted) buffer
    // const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    // return result;
}

// encrypt('hello', 'mygr8password')

function nextWindow(pathToGo) {
    let newWin1 = new BrowserWindow({
        width: 1000,
        height: 700,
        // fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    newWin1
        .loadURL(`file://${path.join(__dirname, pathToGo)}`)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
        })
    win.close()
}

class FullQuestionMark {
    constructor(
        author,
        type,
        title,
        Distription,
        Time,
        Instruction,
        questions,
        password
    ) {
        this.author = author
        this.type = type
        this.title = title
        this.distription = Distription
        this.time = Time
        this.instruction = Instruction
        this.questions = questions
        this.password = password
    }
    returnObject() {
        return new Object({
            author: this.author,
            type: this.type,
            title: this.title,
            distription: this.distription,
            time: this.time,
            instruction: this.instruction,
            questions: this.questions,
            password: this.password,
        })
    }
}

_form.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    var type = 'test'
    type = evt.target[1].checked ? 'test' : 'exam'
    await localForage.getItem('questions').then((questions) => {
        let saver = new FullQuestionMark(
            evt.target[0].value,
            type,
            evt.target[3].value,
            evt.target[4].value,
            evt.target[5].value,
            evt.target[6].value,
            questions,
            evt.target[7].value
        ).returnObject()
        localForage.getItem('dataStory').then((dataStory) => {
            localForage.getItem('works').then((works) => {
                if (works) {
                    dialog
                        .showSaveDialog({
                            title: 'save vce file',
                            buttonLabel: 'convert',
                            message: 'Give a name to the converted file',
                            nameFieldLabel: 'file name',
                        })
                        .then((result) => {
                            try {
                                fs.writeFile(
                                    `${result.filePath}.vce`,
                                    JSON.stringify(saver),
                                    (err, result) => {
                                        if (err) {
                                            alert(
                                                'unable to save please try again'
                                            )
                                            throw Error(err)
                                        } else {
                                            localForage
                                                .setItem('works', [
                                                    ...works,
                                                    {
                                                        ...saver,
                                                        data: dataStory,
                                                    },
                                                ])
                                                .then(() => {
                                                    console.log(result)
                                                    nextWindow(
                                                        '../view/load.html'
                                                    )
                                                })
                                        }
                                    }
                                )
                            } catch (error) {
                                console.log(error)
                                alert('unable to save please try again')
                            }
                        })
                } else {
                    dialog
                        .showSaveDialog({
                            title: 'save vce file',
                            buttonLabel: 'qenerate',
                            message: 'Give a name to the converted file',
                            nameFieldLabel: 'file name',
                        })
                        .then((result) => {
                            try {
                                fs.writeFile(
                                    `${result.filePath}.vce`,
                                    JSON.stringify(saver),
                                    (err, result) => {
                                        if (err) {
                                            alert(
                                                'unable to save please try again'
                                            )
                                            throw Error(err)
                                        } else {
                                            localForage
                                                .setItem('works', [
                                                    {
                                                        ...saver,
                                                        data: dataStory,
                                                    },
                                                ])
                                                .then(() => {
                                                    nextWindow(
                                                        '../view/load.html'
                                                    )
                                                })
                                        }
                                    }
                                )
                            } catch (error) {
                                console.log(error)
                                alert('unable to save please try again')
                            }
                        })
                }
            })
        })
    })
})
cancel.addEventListener('click', () => {
    nextWindow('../view/load.html')
    // app.webContents.p;
})
