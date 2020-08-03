const electronApp = require('electron').remote
const {
    BrowserWindow
} = electronApp
const fs = require('fs')
// const path = require("path");
// const dialog = electronApp.dialog;
// const saveBtn = document.getElementById("saveBtn");
const undo = document.getElementById(`undo`)
const redo = document.getElementById(`redo`)
const menuBTn = document.getElementById('menu')
const previewBtn = document.getElementById('preview')
const panel = document.getElementById('panel')
const createBtn = document.getElementById('create')
const webContent = require('electron').remote.webContents
const winBase = electronApp.getCurrentWindow()
const plain = document.getElementById('plain')
const nameSaver = document.getElementById('nameSaver')
const localForage = require('localforage')
const QuestionField = document.querySelector('.QuestionsPlan')
require("./editorCodex")
const EditorJS = require('@editorjs/editorjs');


const editor = new EditorJS();

let observer = new MutationObserver((mult) => {
    tinymce.init({
        selector: '.plan .question',
        toolbar: true,
        menubar: false,
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Daniel Amos',
    });
});

observer.observe(QuestionField, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});



// =========== markAction ============ //
// const questionMarker = document.getElementById("questionMarker");
// const imageMarker = document.getElementById("imageMarker");
// const answerMarker = document.getElementById("answerMarker");
// =============== end ============== //

QuestionField.addEventListener('click', evt => {
    if (evt.target.className.includes('delete')) {
        evt.target.parentElement.parentElement.remove()
    }
})

QuestionField.addEventListener('change', evt => {
    if (evt.target.type === 'file') {
        if (
            ['image/png', 'image/jpeg', 'image/jpg'].indexOf(
                evt.target.files[0].type
            ) > -1
        ) {
            var reader = new FileReader()
            reader.onload = result => {
                let base64 = btoa(result.target.result)
                evt.target.parentElement.firstElementChild.src = `data:${evt.target.files[0].type};base64,${base64}`
                evt.target.parentElement.firstElementChild.setAttribute(
                    'data-src',
                    base64
                )
            }
            reader.readAsBinaryString(evt.target.files[0])
        } else {
            console.log('not accepted')
        }
    }
})

localForage.getItem('data').then(result => {
    if (
        result !== null &&
        result !== undefined &&
        result != '' &&
        result != 'null'
    ) {
        plain.innerText = result
    } else {
        console.log(result)
    }
})

menuBTn.addEventListener('click', () => {
    if (menuBTn.className === 'nav-menu') {
        menuBTn.classList.add('active')
        panel.classList.add('out')
    } else {
        menuBTn.classList.remove('active')
        panel.classList.remove('out')
    }
})

undo.addEventListener('click', () => {
    let foucsedWin = webContent.getFocusedWebContents()
    foucsedWin.undo()
})
redo.addEventListener('click', () => {
    let foucsedWin = webContent.getFocusedWebContents()
    foucsedWin.redo()
})

previewBtn.addEventListener('click', () => {
    let newWin = new BrowserWindow({
        width: 375,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    newWin
        .loadURL(`file://${path.join(__dirname, '../view/editor.html')}`)
        .then(result => {})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
})

createBtn.addEventListener('click', () => {
    winBase
        .loadURL(`file://${path.join(__dirname, '../view/load.html')}`)
        .then(result => {})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
})

localForage.getItem('works').then(results => {
    if (results) {
        results.forEach(result => {
            let s = document.createElement('span')
            s.classList.add('work')
            s.setAttribute('data-index', results.indexOf(result))
            s.innerText = result.title
            panel.appendChild(s)
        })
        panel.addEventListener('click', evt => {
            let index = evt.target.getAttribute('data-index')
            // console.log(index, results[index])
            localForage.setItem('data', results[index].data).then(() => {
                localForage
                    .setItem('questions', results[index].questions)
                    .then(() => {
                        winBase.reload()
                    })
            })
        })
    } else {
        console.log('empty')
    }
})