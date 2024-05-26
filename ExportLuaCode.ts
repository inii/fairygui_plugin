import { FairyEditor } from 'csharp';
import { System } from 'csharp';

const convert = require("lib/xml-js");

class ExportLuaCode {
    libView: FairyEditor.View.LibraryView;
    contextMenu: FairyEditor.Component.IMenu;
    selector: FairyEditor.FPackageItem;
    menuName = "export_to_lua_menu";
    contentArr: string[] = [];

    constructor() {
        this.libView = FairyEditor.App.libView;
        this.contextMenu = this.libView.contextMenu;
        this.addContextMenuItem();
    }

    dispose() {
        this.removeContextMenuItem();
    }

    getElements(xmlObj: any): any {
        if (xmlObj.elements && xmlObj.elements[0])
            return xmlObj.elements
    }

    parseCtrl(obj: any) {
        let varName = obj.attributes.name;
        if ((varName || "") == "")
            return;

        let codeContent = `self._${varName} = view:GetController("${varName}")`;
        this.contentArr.push(codeContent);
    }

    parseDisplayList(obj: any) {
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

    parseTrans(obj: any) {
        let varName = obj.attributes.name;
        if ((varName || "") == "")
            return;

        let codeContent = `self._${varName} = view:GetTransition("${varName}")`;
        this.contentArr.push(codeContent);
    }



    private addContextMenuItem() {
        this.contextMenu.AddItem("导出为Lua代码并拷贝", this.menuName, () => {
            let selector = this.libView.GetSelectedResource()

            if (selector.file.endsWith(".xml"))
                this.exportCode(selector.file);
            else
                globalThis.Utils.showTips("不支持的导出类型");

            // console.log("selector.supportResolution", selector.supportResolution);

        });
    }

    private removeContextMenuItem() {
        this.contextMenu.RemoveItem(this.menuName);
    }

    public exportCode(xmlPath: string) {
        let str = System.IO.File.ReadAllText(xmlPath);
        let xmlObj = convert.xml2js(str);
        this.contentArr.push("local view = self.view");

        let eles = this.getElements(xmlObj)
        if (eles) {
            // console.log("elememts name:", eles[0].name);
            eles = this.getElements(eles[0])
            for (let i = 0; i < eles.length; i++) {
                let ele = eles[i];
                // if (ele.attributes && ele.attributes.name) {
                if (ele.name == "controller")
                    this.parseCtrl(ele)
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
            FairyEditor.Clipboard.SetText(codeContent);
            this.contentArr = [];
            globalThis.Utils.showTips("已转化为Lua并拷贝,ctrl+v粘贴到文件中,CV快乐");
        }


    }

}
export { ExportLuaCode };