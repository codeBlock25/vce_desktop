const app = require("electron").remote;
const { BrowserWindow } = require("electron").remote;
const dialog = app.dialog;
const importBtn = document.getElementById("import");
const createBtn = document.getElementById("create");
const continueBtn = document.getElementById("continue");
const win = app.getCurrentWindow();
const fs = require("fs");
const path = require("path");
const pdfUtil = require("pdf-to-text");
const mammoth = require("mammoth");
let secret = localStorage.getItem("secret");
const localForage = require("localforage");

// if (secret) {
//     win.setFullScreen(false)
//     win.setBounds({width: 800, height: 500, x: 100, y: 100}, true)
// } else {
//     let newWin = new BrowserWindow({
//         width: 800,
//         height: 500,
//         webPreferences: {
//           nodeIntegration: true
//         }
//     })
//     newWin.webContents.openDevTools()
//     newWin.loadURL(`file://${path.join(__dirname, '../view/account.html')}`).then((result)=>{
//         console.log(result)
//     }).catch((err)=>{
//         console.log(JSON.stringify(err))
//     })
//     win.close()
// }
var fileContent = "";

function nextWindow(linkURL) {
  // let newWin1 = new BrowserWindow({
  //   width: 1000,
  //   height: 700,
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // });
  // // newWin1.webContents.openDevTools();
  // newWin1
  //   .loadURL(`file://${path.join(__dirname, linkURL || "../view/editor.html")}`)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(JSON.stringify(err));
  //   });
  win.loadURL(
    `file://${path.join(__dirname, linkURL || "../view/editor.html")}`
  );
}

importBtn.addEventListener("click", () => {
  dialog
    .showOpenDialog(win, {
      properties: ["openFile"],
      title: "Pick file to edit",
      filters: [
        { name: "Custom File Type", extensions: ["vce"] },
        { name: "word", extensions: "docx" },
        { name: "application/pdf", extensions: "pdf" },
        { name: "text/plain", extensions: "text" }
      ]
    })
    .then(async result => {
      if (result.canceled) {
        return null;
      } else {
        let fileFound = result.filePaths[0].split("/");
        let file = fileFound[fileFound.length - 1].split(".");
        let fileExtension = (file = file[file.length - 1]);
        console.log(fileExtension);
        if (
          fileExtension.toLowerCase() === "vce" ||
          fileExtension.toLowerCase() === "txt"
        ) {
          fs.readFile(result.filePaths[0], "utf-8", (err, result) => {
            if (err) {
              throw err;
            }
            localForage.setItem("data", result).then(() => {
              localForage.setItem("questions", null).then(() => {
                nextWindow("../view/formatter.html");
              });
            });
          });
        } else if (fileExtension.toLowerCase() === "docx") {
          mammoth
            .extractRawText({ path: result.filePaths[0] })
            .then(function(result) {
              localForage.setItem("data", result.value).then(() => {
                localForage.setItem("questions", null).then(() => {
                  nextWindow("../view/formatter.html");
                });
              });
            });
        } else if (fileExtension.toLowerCase() === "pdf") {
          pdfUtil.pdfToText(result.filePaths[0], function(err, data) {
            if (err) throw err;
            localForage.setItem("data", data).then(() => {
              localForage.setItem("questions", null).then(() => {
                nextWindow("../view/formatter.html");
              });
            });
          });
        } else {
          dialog.showErrorBox(
            "Can't open select file",
            `The file you have select is not one of the accept file type by VCE. please select a .vce, .docx, .txt or .pdf file to continue`
          );
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
});

createBtn.addEventListener("click", () => {
  localForage.setItem("data", null).then(() => {
    localForage.setItem("questions", null).then(() => {
      nextWindow();
    });
  });
});

continueBtn.addEventListener("click", () => {
  localForage.getItem("data").then(data => {
    if (data === "null" || data === null || data === undefined || data === "") {
      localForage.setItem("data", null).then(() => {
        nextWindow();
      });
    } else {
      nextWindow();
    }
  });
});
