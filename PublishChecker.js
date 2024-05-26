"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishChecker = void 0;
const csharp_1 = require("csharp");
let App = csharp_1.FairyEditor.App;
class PublishChecker {
    lastPkg = null;
    waitPkgArr = []; // 
    pkgMap = new Map(); // 
    // 
    pkgTreeChangeCbk1;
    pkgReloadCbk1;
    // bgChangeCbk1: FairyGUI.EventCallback1;
    projRefreshEndCbk1;
    // tryPublishCbk: System.Action;
    publishHandler;
    constructor() {
        this.projRefreshEndCbk1 = this.onProjectRefreshEnd.bind(this);
        // this.bgChangeCbk1 = this.onBackgroundChanged.bind(this);
        // this.pkgTreeChangeCbk1 = this.onPackageTreeChanged.bind(this);
        this.pkgReloadCbk1 = this.onPackageReload.bind(this);
        // this.tryPublishCbk = this.onTryPublishComplete.bind(this);
        App.On(csharp_1.FairyEditor.EditorEvents.PackageReloaded, this.pkgReloadCbk1);
        App.On(csharp_1.FairyEditor.EditorEvents.ProjectRefreshEnd, this.projRefreshEndCbk1);
        // App.On(FairyEditor.EditorEvents.PackageItemChanged, this.bgChangeCbk1);
        // App.On(FairyEditor.EditorEvents.PackageTreeChanged, this.pkgTreeChangeCbk1);
    }
    refreshed = false;
    onProjectRefreshEnd() {
        console.log(" onProjectRefreshEnd ............. ");
        setTimeout(() => {
            if (this.waitPkgArr.length < 1 || this.reload != this.refreshed) {
                this.clearData();
            }
            // this.lastPkg = null;
            // this.publishHandler = null;
        }, 3000);
        this.refreshed = true;
        this.tryPublish();
    }
    dispose() {
        console.log("PublishChecker dispose called");
        App.Off(csharp_1.FairyEditor.EditorEvents.PackageReloaded, this.pkgReloadCbk1);
        App.Off(csharp_1.FairyEditor.EditorEvents.ProjectRefreshEnd, this.projRefreshEndCbk1);
        // App.Off(FairyEditor.EditorEvents.PackageItemChanged, this.bgChangeCbk1);
        // App.Off(FairyEditor.EditorEvents.PackageTreeChanged, this.pkgTreeChangeCbk1);
        this.pkgTreeChangeCbk1 = null;
        this.pkgReloadCbk1 = null;
        // this.bgChangeCbk1 = null;
        this.projRefreshEndCbk1 = null;
        // this.tryPublishCbk = null;
    }
    checkRefresh(pkg) {
        if (this.waitPkgArr.length > 1)
            return;
        App.RefreshProject();
    }
    reload = false;
    onPackageReload() {
        this.reload = true;
        console.log("package reload reload reload reload.==========>");
        this.tryPublish();
    }
    tryPublish() {
        if (!this.reload || !this.refreshed)
            return;
        console.log("this.waitPkgMap.size:", this.waitPkgArr.length);
        const pkg = this.waitPkgArr.pop();
        if (pkg == null) {
            this.clearData();
            return;
        }
        const publishHandler = new csharp_1.FairyEditor.PublishHandler(pkg, App.project.activeBranch);
        publishHandler.Run();
        publishHandler.add_onComplete(() => {
            if (pkg != null) {
                globalThis.Utils.showTips(`刷新后再次发布${pkg.name}完成`);
            }
            this.tryPublish();
        });
    }
    AddPublishHandler(handler) {
        const pkg = handler.pkg;
        if (this.pkgMap.has(pkg.name))
            return;
        this.pkgMap.set(pkg.name, pkg);
        this.AddPkg(pkg);
        handler.add_onComplete(() => { this.checkRefresh(pkg); });
    }
    AddPkg(pkg) {
        if (pkg != null)
            this.waitPkgArr.push(pkg);
    }
    clearData() {
        console.log("clear Data called");
        this.reload = false;
        this.refreshed = false;
        this.pkgMap.clear();
        this.waitPkgArr = [];
    }
}
exports.PublishChecker = PublishChecker;
