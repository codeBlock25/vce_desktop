const electronApp = require("electron").remote;
const { BrowserWindow } = electronApp;
const fs = require("fs");
// const path = require("path");
// const dialog = electronApp.dialog;
// const saveBtn = document.getElementById("saveBtn");
const undo = document.getElementById(`undo`);
const redo = document.getElementById(`redo`);
const menuBTn = document.getElementById("menu");
const previewBtn = document.getElementById("preview");
const panel = document.getElementById("panel");
const createBtn = document.getElementById("create");
const webContent = require("electron").remote.webContents;
const winBase = electronApp.getCurrentWindow();
const plain = document.getElementById("plain");
const nameSaver = document.getElementById("nameSaver");
const localForage = require("localforage");
const QuestionField = document.querySelector(".QuestionsPlan");
// =========== markAction ============ //
// const questionMarker = document.getElementById("questionMarker");
// const imageMarker = document.getElementById("imageMarker");
// const answerMarker = document.getElementById("answerMarker");
// =============== end ============== //

QuestionField.addEventListener("click", evt => {
  if (evt.target.className.includes("delete")) {
    evt.target.parentElement.parentElement.remove();
  }
});

QuestionField.addEventListener("change", evt => {
  if (evt.target.type === "file") {
    if (
      ["image/png", "image/jpeg", "image/jpg"].indexOf(
        evt.target.files[0].type
      ) > -1
    ) {
      console.log(evt.target.files[0].type);
      var reader = new FileReader();
      reader.onload = result => {
        let base64 = btoa(result.target.result);
        evt.target.parentElement.firstElementChild.src = `data:${evt.target.files[0].type};base64,${base64}`;
      };
      reader.readAsBinaryString(evt.target.files[0]);
    } else {
      console.log("not accepted");
    }
  }
});

localForage.getItem("data").then(result => {
  if (
    result !== null &&
    result !== undefined &&
    result != "" &&
    result != "null"
  ) {
    plain.innerText = result;
  } else {
    console.log(result);
  }
});

localForage.getItem("questions").then(result => {
  if (
    result !== null &&
    result !== undefined &&
    result != "" &&
    result != "null"
  ) {
    result.qeustion.forEach(questione => {
      let block = document.createElement("div");
      block.classList.add("plan");
      console.log(questione.image);
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
              <img src=${questione.image} class='img'>
              <input type="file" accept="image/*" id="imgPicker" style="display: none;">
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
  } else {
    // file1.parentElement.firstElementChild.style.backgroundImage = 'url(data:image/png;base64, reader.result)'}
    let block2 = document.createElement("div");
    block2.classList.add("plan");
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
              <input type="file" accept="image/*" id="imgPicker" style="display: none;">
              <label class='imgBtn' for='imgPicker'>add image</label>
              </div>
                <div class="ans">
                  <div class='answer' contenteditable="true"></div>
                  <div class='answer correct' contenteditable="true"></div>
                  <div class='answer' contenteditable="true"></div>
                  <div class='answer' contenteditable="true"></div>
      <span class='delete'>remove block</span>
                </div>`;
    QuestionField.appendChild(block2);
  }
});

// const inputImage = document.getElementById("imgPicker");
// inputImage.addEventListener("change", evt => {
//   console.log(evt);
// });

menuBTn.addEventListener("click", () => {
  if (menuBTn.className === "nav-menu") {
    menuBTn.classList.add("active");
    panel.classList.add("out");
  } else {
    menuBTn.classList.remove("active");
    panel.classList.remove("out");
  }
});

undo.addEventListener("click", () => {
  let foucsedWin = webContent.getFocusedWebContents();
  foucsedWin.undo();
});
redo.addEventListener("click", () => {
  let foucsedWin = webContent.getFocusedWebContents();
  foucsedWin.redo();
});

previewBtn.addEventListener("click", () => {
  let newWin = new BrowserWindow({
    width: 375,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  newWin
    .loadURL(`file://${path.join(__dirname, "../view/editor.html")}`)
    .then(result => {})
    .catch(err => {
      console.log(JSON.stringify(err));
    });
});

createBtn.addEventListener("click", () => {
  // winBase.setFullScreen(false);
  // setTimeout(() => {
  //   winBase.close();
  // }, 300);
  // let newWin = new BrowserWindow({
  //   width: 800,
  //   height: 500,
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // });
  winBase
    .loadURL(`file://${path.join(__dirname, "../view/load.html")}`)
    .then(result => {})
    .catch(err => {
      console.log(JSON.stringify(err));
    });
});

localForage.getItem("works").then(results => {
  if (results) {
    results.forEach(result => {
      let s = document.createElement("span");
      s.classList.add("work");
      s.setAttribute("data-index", results.indexOf(result));
      s.innerText = result.title;
      panel.appendChild(s);
    });
  } else {
    console.log("empty");
  }
});
