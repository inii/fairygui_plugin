import { FairyEditor, FairyGUI, System } from 'csharp';


let App = FairyEditor.App;

class PublishChecker {


    private lastPkg: FairyEditor.FPackage = null;
    private waitPkgArr: FairyEditor.FPackage[] = []; // 
    private pkgMap = new Map<string, FairyEditor.FPackage>(); // 
    // 

    pkgTreeChangeCbk1: FairyGUI.EventCallback1;
    pkgReloadCbk1: FairyGUI.EventCallback1;
    // bgChangeCbk1: FairyGUI.EventCallback1;
    projRefreshEndCbk1: FairyGUI.EventCallback1;
    // tryPublishCbk: System.Action;
    publishHandler: FairyEditor.PublishHandler;

    constructor() {
        this.projRefreshEndCbk1 = this.onProjectRefreshEnd.bind(this);
        // this.bgChangeCbk1 = this.onBackgroundChanged.bind(this);
        // this.pkgTreeChangeCbk1 = this.onPackageTreeChanged.bind(this);
        this.pkgReloadCbk1 = this.onPackageReload.bind(this);
        // this.tryPublishCbk = this.onTryPublishComplete.bind(this);

        App.On(FairyEditor.EditorEvents.PackageReloaded, this.pkgReloadCbk1);
        App.On(FairyEditor.EditorEvents.ProjectRefreshEnd, this.projRefreshEndCbk1);
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
        }, 3000);

        this.refreshed = true;
        this.tryPublish();
    }

    public dispose() {
        console.log("PublishChecker dispose called");
        App.Off(FairyEditor.EditorEvents.PackageReloaded, this.pkgReloadCbk1);
        App.Off(FairyEditor.EditorEvents.ProjectRefreshEnd, this.projRefreshEndCbk1);
        // App.Off(FairyEditor.EditorEvents.PackageItemChanged, this.bgChangeCbk1);
        // App.Off(FairyEditor.EditorEvents.PackageTreeChanged, this.pkgTreeChangeCbk1);

        this.pkgTreeChangeCbk1 = null;
        this.pkgReloadCbk1 = null;
        // this.bgChangeCbk1 = null;
        this.projRefreshEndCbk1 = null;
        // this.tryPublishCbk = null;
    }

    public checkRefresh(pkg: FairyEditor.FPackage) {
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

    private tryPublish() {
        if (!this.reload || !this.refreshed)
            return;

        console.log("this.waitPkgMap.size:", this.waitPkgArr.length);

        const pkg = this.waitPkgArr.pop();
        if (pkg == null) {
            this.clearData();
            return;
        }

        const publishHandler = new FairyEditor.PublishHandler(pkg, App.project.activeBranch);
        publishHandler.Run();
        publishHandler.add_onComplete(() => {
            if (pkg != null) {
                globalThis.Utils.showTips(`刷新后再次发布${pkg.name}完成`);
            }
            this.tryPublish();
        });

    }

    AddPublishHandler(handler: FairyEditor.PublishHandler) {
        const pkg = handler.pkg;
        if (this.pkgMap.has(pkg.name))
            return;

        this.pkgMap.set(pkg.name, pkg);

        this.AddPkg(pkg);
        handler.add_onComplete(() => { this.checkRefresh(pkg); });
    }

    AddPkg(pkg: FairyEditor.FPackage) {
        if (pkg != null)
            this.waitPkgArr.push(pkg);
    }

    private clearData() {
        console.log("clear Data called");
        this.reload = false;
        this.refreshed = false;
        this.pkgMap.clear();
        this.waitPkgArr = [];
    }


}

export { PublishChecker };