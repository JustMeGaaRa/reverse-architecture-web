import * as vscode from "vscode";
import { WorkspacePreviewSynchronizer } from "./WorkspacePreviewSynchronizer";

export class WorkspacePreviewPanel {
    private _panel?: vscode.WebviewPanel;
    private _context: vscode.ExtensionContext;
	private _synchonizer?: WorkspacePreviewSynchronizer;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public show() {
		// The code you place here will be executed every time your command is executed
		if (this._panel) {
			this._panel.reveal(vscode.ViewColumn.Beside, true);
			return;
		}

		this._panel = vscode.window.createWebviewPanel(
			"structurizr.preview",
			"Structurizr Preview",
			vscode.ViewColumn.Beside,
			{ enableScripts: true, retainContextWhenHidden: true }
		);
		
		// const cssPath = vscode.Uri.joinPath(this._context.extensionUri, "dist", "webview", "static", "css", "main.css");
		// const cssUri = panel.webview.asWebviewUri(cssPath);
		const scriptPath = vscode.Uri.joinPath(this._context.extensionUri, "dist", "webview", "static", "js", "main.js");
		const scriptUri = this._panel.webview.asWebviewUri(scriptPath);

		this._panel.webview.html = this.getHtmlContent(scriptUri);
		this._synchonizer = new WorkspacePreviewSynchronizer(this._panel);
		this._context.subscriptions.push(this._synchonizer);

		if (vscode.window.activeTextEditor) {
			const structurizr = vscode.window.activeTextEditor.document?.getText();
			this._synchonizer.initialize(structurizr);
		}

		this._panel.onDidDispose(() => {
            this._synchonizer?.dispose();
			this._synchonizer = undefined;
            this._panel = undefined;
		});
    }
	
	private getHtmlContent(scriptUri: vscode.Uri) {
		return `
			<!doctype html>
			<html lang="en">
				<head>
					<meta charset="utf-8"/>
					<link rel="icon" href="/favicon.ico"/>
					<meta name="viewport" content="width=device-width,initial-scale=1"/>
					<meta name="theme-color" content="#000000"/>
					<meta name="description" content="Web site created using create-react-app"/>
					<link rel="apple-touch-icon" href="/logo192.png"/>
					<link rel="manifest" href="/manifest.json"/>
					<link rel="preconnect" href="https://rsms.me/">
					<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
					<link rel="preconnect" href="https://fonts.cdnfonts.com/">
					<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/formula-condensed">
					<title>Structurizr Preview by Restruct</title>
					<script defer="defer" src="${scriptUri}"></script>
				</head>
				<body style="padding: 0px; margin: 0px;">
					<noscript>You need to enable JavaScript to run this app.
					</noscript>
					<div id="root">
					</div>
				</body>
			</html>
		`;
	}
}
