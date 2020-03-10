const localForage = require("localforage");
var extracted_data = "";
const QuestionField = document.querySelector(".QuestionsPlan");
localForage.getItem("data").then(result => {
  var mark_down = [];
  result.length <= 1 || result === null
    ? ""
    : result.split("\n").forEach(ment => {
        mark_down.push(ment);
      });

  var questionblock = [];
  var set = 0;
  var count = 0;
  for (let i = 0; i < mark_down.length; i++) {
    if (questionblock.length > set + 1) {
      // console.log(questionblock.length, set);
      set++;
    }
    if (/^\d/.test(mark_down[i]) === true) {
      question = mark_down[i];
      questionblock.push({
        question: {
          mark: 5,
          question: mark_down[i]
        },
        options: []
      });
    }
    if (/^[a-d]|[A-D]\./im.test(mark_down[i]) === true) {
      if (count >= 4) {
        count = 0;
      } else {
        // console.log(mark_down[i]);
        if (/^\b(\w*answer\w*)\b/im.test(mark_down[i]) === true) {
          questionblock[set].options.push({
            op: "",
            correct: false
          });
        } else {
        questionblock[set].options.push({
          op: mark_down[i],
          correct: false
        });
        }
        count++;
      }
    }
    if (/^answer:[A-D]|[a-d]$/.test(mark_down[i].toLowerCase())) {
      switch (mark_down[i].toLowerCase().split(-1)) {
        case "a":
          questionblock[set].options[0].correct = true;
          break;
        case "b":
          questionblock[set].options[1].correct = true;
          break;
        case "c":
          questionblock[set].options[2].correct = true;
          break;
        case "d":
          questionblock[set].options[3].correct = true;
          break;
        default:
          break;
      }
    }
  }
  localForage.getItem("questions", result => {
    if (
      result === null ||
      result === undefined ||
      result == "" ||
      result === "null"
    ) {
      localForage.setItem("questions", questionblock).then(() => {
        questionblock.forEach(questione => {
          let block = document.createElement("div");
          block.classList.add("plan");
          block.innerHTML = `
              <div class="question">
                <span class="mark" contenteditable="true">${questione.question
                  .mark || ""}</span>
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
              <img class='img'>
              <input type="file" accept="image/*" id="imgPicker" style="display: none;" maxlength='1' multiple='false'>
              <label class='imgBtn' for='imgPicker'>add image</label>
              </div>
              <div class="ans">
                <div class=${
                  questione.options[0]
                    ? questione.options[0].correct === true
                      ? `"answer correct"`
                      : `"answer"`
                    : "answer"
                } contenteditable="true">${
            questione.options[0] ? questione.options[0].op : ""
          }</div>
                <div class=${
                  questione.options[1]
                    ? questione.options[1].correct === true
                      ? `"answer correct"`
                      : `"answer"`
                    : "answer"
                } contenteditable="true">${
            questione.options[1] ? questione.options[1].op : ""
          }</div>
                <div class=${
                  questione.options[2]
                    ? questione.options[2].correct === true
                      ? `"answer correct"`
                      : `"answer"`
                    : "answer"
                } contenteditable="true">${
            questione.options[2] ? questione.options[2].op : ""
          }</div>
                <div class=${
                  questione.options[3]
                    ? questione.options[3].correct === true
                      ? `"answer correct"`
                      : `"answer"`
                    : "answer"
                } contenteditable="true">${
            questione.options[3] ? questione.options[3].op : ""
          }</div>

      <span class='delete'>remove block</span>
              </div>`;
          QuestionField.appendChild(block);
        });
      });
    }
  });
});
