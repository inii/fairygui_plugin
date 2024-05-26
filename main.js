"use strict";
//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = exports.onPublish = void 0;
const ExportLuaCode_1 = require("./ExportLuaCode");
const PublishChecker_1 = require("./PublishChecker");
const Utils_1 = require("./Utils");
globalThis.Utils = Utils_1.Utils;
let exportCodeLua = new ExportLuaCode_1.ExportLuaCode();
let publishChecker = new PublishChecker_1.PublishChecker();
function onPublish(handler) {
    publishChecker.AddPublishHandler(handler);
    // console.log("PublishHandler ++count:", ++count);
    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}
exports.onPublish = onPublish;
function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
    publishChecker.dispose();
}
exports.onDestroy = onDestroy;
