//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

import { FairyEditor } from 'csharp';
import { ExportLuaCode } from './ExportLuaCode';
// import { PublishChecker } from './PublishChecker';
let App = FairyEditor.App;

import { System } from 'csharp';
System.IO.Directory.GetFileSystemEntries

import { Utils } from './Utils';
globalThis.Utils = Utils;


let exportCodeLua = new ExportLuaCode()
// let publishChecker = new PublishChecker()

// App.add_onUpdate(() => {
//     if (App.isActive != true)
//         App.RefreshProject();
// })

// let count = 0;
let onfouchCbk = () => {
    // console.log("add_onValidate", ++count);
    App.RefreshProject();
}
App.add_onValidate(onfouchCbk)

// App.On(FairyEditor.EditorEvents.ProjectRefreshEnd, () => {

// });


function onPublish(handler: FairyEditor.PublishHandler) {
    // publishChecker.AddPublishHandler(handler);
    // handler.paused = true;
    // hndler = handler

    // console.log("PublishHandler ++count:", ++count);

    // if (!handler.genCode) return;
    // handler.genCode = false; //prevent default output 111test success!!!!!!
    // FairyEditor.ProcessUtil.Start("cmd.exe", ["/c", "echo test success!!!!!!"]);
}

function onDestroy() {
    //do cleanup here
    exportCodeLua.dispose();
    App.remove_onValidate(onfouchCbk);
    // publishChecker.dispose();
}


export { onPublish, onDestroy };

