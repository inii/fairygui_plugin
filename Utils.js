"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const csharp_1 = require("csharp");
let App = csharp_1.FairyEditor.App;
class Utils {
    static showTips(strTips) {
        setTimeout(() => {
            App.CloseWaiting();
        }, 2000);
        App.ShowWaiting(strTips);
    }
}
exports.Utils = Utils;
