"use strict";
//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = exports.onPublish = void 0;
const csharp_1 = require("csharp");
const ExportLuaCode_1 = require("./ExportLuaCode");
// import { PublishChecker } from './PublishChecker';
let App = csharp_1.FairyEditor.App;
const csharp_2 = require("csharp");
csharp_2.System.IO.Directory.GetFileSystemEntries;
const Utils_1 = require("./Utils");
globalThis.Utils = Utils_1.Utils;
let exportCodeLua = new ExportLuaCode_1.ExportLuaCode();
// let publishChecker = new PublishChecker()
// App.add_onUpdate(() => {
//     if (App.isActive != true)
//         App.RefreshProject();
// })
// let count = 0;
let onfouchCbk = () => {
    // console.log("add_onValidate", ++count);
    App.RefreshProject();
};
App.add_onValidate(onfouchCbk);
// App.On(FairyEditor.EditorEvents.ProjectRefreshEnd, () => {
// });
function onPublish(handler) {
    // publishChecker.AddPublishHandler(handler);
    // handler.paused = true;
    // hndler = handler
    // console.log("PublishHandler ++count:", ++count);
    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}
exports.onPublish = onPublish;
function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
    App.remove_onValidate(onfouchCbk);
    // publishChecker.dispose();
}
exports.onDestroy = onDestroy;
