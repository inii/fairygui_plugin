import { FairyEditor } from 'csharp';
let App = FairyEditor.App;

export class Utils {
	public static showTips(strTips) {
		setTimeout(() => {
			App.CloseWaiting();
		}, 2000);
		App.ShowWaiting(strTips);
	}
}




