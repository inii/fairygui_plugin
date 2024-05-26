//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

import { FairyEditor } from 'csharp';
import { ExportLuaCode } from './ExportLuaCode';

let exportCodeLua = new ExportLuaCode()

function onPublish(handler: FairyEditor.PublishHandler) {
    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}

function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
}

export { onPublish, onDestroy };