"use strict";

import { app, protocol, BrowserWindow, globalShortcut } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== "production";

// 关闭GPU加速
app.disableHardwareAcceleration();

let win: any = null;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
const path = require("path");
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: false, //隐藏默认菜单栏。
    show: isDevelopment ? true : false,
    webPreferences: {
      //渲染进程使用node
      nodeIntegration: true,
      contextIsolation: false, //electron12.0版本以上设置此项。
      enableRemoteModule: true,
    },
    // icon:`${__static}/favicon.ico`
    icon: path.join(__dirname, "favicon.ico"),
  });
  win.menuBarVisible = false;
  // win.setBackgroundColor('#1296db')
  isDevelopment? win.setOpacity(1) : win.setOpacity(0)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  //闪屏优化显示。加载完才显示。
  win.on("ready-to-show",  () => {
    try {
      // win.maximize()
      win.show()
      //显示延时500ms
      setTimeout(() => {
        // window.focus()
        win.setOpacity(1)
      }, 500);
    } catch (error) {}
  });
}

// 单例模式代码。不能打开重复APP
const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  try {
    console.log("is second instance");
    app.quit();
  } catch (error) {
    console.log("reopen close err");
  }
} else {
  app.on("second-instance", (event, commanLine, workingDirectory) => {
    console.log("new app started", commanLine);
    try {
      if (win) {
        if (win.isMinimized()) {
          win.restore()
        }
        win.focus()
      }
    } catch (error) {
      console.log("reopen new app err");
    }
  });
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  //通过快捷方式打开调试助手
  globalShortcut.register("CommandOrControl+Shift+i", function () {
    win.webContents.openDevTools();
  });
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
