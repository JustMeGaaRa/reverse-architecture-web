import {
	EventName,
	WorkspacePreviewEventObserver
} from "@restruct/vscode-communication";
import * as vscode from "vscode";
import {
	TextEditorDocumentChangedHandler,
	WorkspaceElementHoveredHandler,
	WorkspaceViewChangedHandler
} from "./handlers";
import { TextEditorDocumentObserver } from "./observers";

export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel;
	let workspaceObserver: WorkspacePreviewEventObserver;
	let textEditorObserver: TextEditorDocumentObserver;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const previewDisposable = vscode.commands.registerCommand('structurizr-preview-restruct.preview', () => {
		// The code you place here will be executed every time your command is executed
		// if (panel) {
		// 	panel.reveal(vscode.ViewColumn.Beside, true);
		// 	return;
		// }

		panel = vscode.window.createWebviewPanel(
			"restruct",
			"Structurizr Preview by Restruct",
			vscode.ViewColumn.Beside,
			{ enableScripts: true, retainContextWhenHidden: true }
		);
		
		const cssUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "static", "css", "main.css"));
		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "static", "js", "main.js"));

		panel.webview.html = `
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
					<link href="${cssUri}" rel="stylesheet">
				</head>
				<body style="padding: 0px;">
					<noscript>You need to enable JavaScript to run this app.
					</noscript>
					<div id="root">
					</div>
				</body>
			</html>
		`;
		
		workspaceObserver = new WorkspacePreviewEventObserver(context, panel);
		workspaceObserver.subscribe(new WorkspaceViewChangedHandler());
		workspaceObserver.subscribe(new WorkspaceElementHoveredHandler());

		textEditorObserver = new TextEditorDocumentObserver(context);
		textEditorObserver.subscribe(new TextEditorDocumentChangedHandler(panel));

		if (vscode.window.activeTextEditor) {
			const structurizr = vscode.window.activeTextEditor.document.getText();
			panel.webview.postMessage({ type: EventName.DOCUMENT_CHANGED, structurizr });
		}
	});

	context.subscriptions.push(previewDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}