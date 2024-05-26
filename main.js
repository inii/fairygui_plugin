"use strict";
//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = exports.onPublish = void 0;
const ExportLuaCode_1 = require("./ExportLuaCode");
let exportCodeLua = new ExportLuaCode_1.ExportLuaCode();
function onPublish(handler) {
    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}
exports.onPublish = onPublish;
function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
}
exports.onDestroy = onDestroy;
