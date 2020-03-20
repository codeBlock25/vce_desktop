const localForage = require('localforage')
const former = document.querySelector('.QuestionsPlan')

localForage.getItem('questions').then(result => {
    if (result) {
        result.forEach(questione => {
            let block = document.createElement('div')
            let rand = Math.ceil(Math.random() * 976531764)
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
              <div class='image'>
                <img src='' class='img'>
                <input type="file" accept="image/*" id="imgPicker${rand}" style="display: none;" maxlength='1' multiple='false'>
                <label class='imgBtn' for='imgPicker${rand}'>add image</label>
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
    } else {
        let block2 = document.createElement('div')
        block2.classList.add('plan')
        let rand = Math.ceil(Math.random() * 976531764)
        block2.innerHTML = `
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
              <input type="file" accept="image/*" id="imgPicker${rand}" style="display: none;">
              <label class='imgBtn' for='imgPicker${rand}'>add image</label>
              </div>
                <div class="ans">
                  <div class='answer' contenteditable="true"></div>
                  <div class='answer correct' contenteditable="true"></div>
                  <div class='answer' contenteditable="true"></div>
                  <div class='answer' contenteditable="true"></div>
      <span class='delete'>remove block</span>
                </div>`
        former.appendChild(block2)
    }
})
