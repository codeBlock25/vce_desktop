// C:\Users\sdkca\Desktop\electron-workspace\build.js
var electronInstaller = require('electron-winstaller')
var path = require('path')
// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './Exam-win32-x64',
    // Specify the existing folder where
    outputDirectory: './vce_app',
    // The name of the Author of the app (the name of your company)
    authors: 'Daniel Amos <fiddoo dev>',
    // The name of the executable of your built
    exe: './Exam.exe',
    icon: path.join(__dirname, './icon.ico'),
    animation: path.join(__dirname, './animation.gif'),
    description: 'Application to edit and create vce files',
}
resultPromise = electronInstaller.createWindowsInstaller(settings)
resultPromise.then(
    () => {
        console.log(
            'The installers of your application were succesfully created !'
        )
    },
    (e) => {
        console.log(`Well, sometimes you are not so lucky: ${e.message}`)
    }
)
