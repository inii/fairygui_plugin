"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLuaCode = void 0;
const csharp_1 = require("csharp");
const csharp_2 = require("csharp");
const convert = require("lib/xml-js");
class ExportLuaCode {
    libView;
    contextMenu;
    selector;
    menuName = "export_to_lua_menu";
    contentArr = [];
    constructor() {
        this.libView = csharp_1.FairyEditor.App.libView;
        this.contextMenu = this.libView.contextMenu;
        this.addContextMenuItem();
    }
    dispose() {
        this.removeContextMenuItem();
    }
    getElements(xmlObj) {
        if (xmlObj.elements && xmlObj.elements[0])
            return xmlObj.elements;
    }
    parseCtrl(obj) {
        let varName = obj.attributes.name;
        if ((varName || "") == "")
            return;
        let codeContent = `self._${varName} = view:GetController("${varName}")`;
        this.contentArr.push(codeContent);
    }
    parseDisplayList(obj) {
        if (obj.elements == null || obj.elements[0] == null) {
            console.log("parseDisplayList: no elements");
            return;
        }
        for (let i = 0; i < obj.elements.length; i++) {
            let ele = obj.elements[i];
            let varName = ele.attributes.name;
            let codeContent = `self._${varName} = view:GetChild("${varName}")`;
            this.contentArr.push(codeContent);
        }
    }
    parseTrans(obj) {
        let varName = obj.attributes.name;
        if ((varName || "") == "")
            return;
        let codeContent = `self._${varName} = view:GetTransition("${varName}")`;
        this.contentArr.push(codeContent);
    }
    showTips(strTips) {
        setTimeout(() => {
            csharp_1.FairyEditor.App.CloseWaiting();
        }, 2000);
        csharp_1.FairyEditor.App.ShowWaiting(strTips);
    }
    addContextMenuItem() {
        this.contextMenu.AddItem("导出为Lua代码并拷贝", this.menuName, () => {
            let selector = this.libView.GetSelectedResource();
            this.exportCode(selector.file);
        });
    }
    removeContextMenuItem() {
        this.contextMenu.RemoveItem(this.menuName);
    }
    exportCode(xmlPath) {
        let str = csharp_2.System.IO.File.ReadAllText(xmlPath);
        let xmlObj = convert.xml2js(str);
        this.contentArr.push("local view = self.view");
        let eles = this.getElements(xmlObj);
        if (eles) {
            // console.log("elememts name:", eles[0].name);
            eles = this.getElements(eles[0]);
            for (let i = 0; i < eles.length; i++) {
                let ele = eles[i];
                // if (ele.attributes && ele.attributes.name) {
                if (ele.name == "controller")
                    this.parseCtrl(ele);
                else if (ele.name == "transition")
                    this.parseTrans(ele);
                else if (ele.name == "displayList")
                    this.parseDisplayList(ele);
                else
                    console.log(" discard element:", ele.name);
                // }
            }
        }
        if (this.contentArr.length > 1) {
            let codeContent = this.contentArr.join("\n");
            csharp_1.FairyEditor.Clipboard.SetText(codeContent);
            this.contentArr = [];
            this.showTips("已转化为Lua并拷贝,ctrl+v粘贴到文件中,CV快乐");
        }
    }
}
exports.ExportLuaCode = ExportLuaCode;
