// C:\Users\sdkca\Desktop\electron-workspace\build.js
var electronInstaller = require("electron-winstaller");
// In this case, we can use relative paths
var settings = {
  // Specify the folder where the built app is located
  appDirectory: "./vce_fiddo_pos",
  // Specify the existing folder where
  outputDirectory: "./vce_app",
  // The name of the Author of the app (the name of your company)
  authors: "Daniel Amos <fiddoo dev>",
  // The name of the executable of your built
  exe: "./vce_app.exe",
  description: "Application to edit and create vce files"
};
resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then(
  () => {
    console.log(
      "The installers of your application were succesfully created !"
    );
  },
  e => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`);
  }
);
