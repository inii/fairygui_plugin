//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

import { FairyEditor } from 'csharp';
import { ExportLuaCode } from './ExportLuaCode';
import { PublishChecker } from './PublishChecker';

import { Utils } from './Utils';
globalThis.Utils = Utils;


let exportCodeLua = new ExportLuaCode()
let publishChecker = new PublishChecker()


function onPublish(handler: FairyEditor.PublishHandler) {
    publishChecker.AddPublishHandler(handler);

    
    

    // console.log("PublishHandler ++count:", ++count);
    
    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}

function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
    publishChecker.dispose();
}


export { onPublish, onDestroy };

