import {
	createEditorDocumentChangedEvent, createWorkspaceViewChangedEvent, TextEditorEvent, WorkspacePreviewEvent
} from "@restruct/vscode-communication";
import { Observable } from "rxjs";
import * as vscode from "vscode";
import {
	createTextEditorDocumentObservable,
	createWorkspacePreviewObservable
} from "./observables";
import {
	TextEditorDocumentChangedObserver,
	WorkspaceElementHoveredObserver,
	WorkspaceViewChangedObserver
} from "./observers";

export class WorkspacePreviewPanel {
    private _panel?: vscode.WebviewPanel;
    private _context: vscode.ExtensionContext;

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
			"restruct",
			"Structurizr Preview by Restruct",
			vscode.ViewColumn.Beside,
			{ enableScripts: true, retainContextWhenHidden: true }
		);
		
		// const cssUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "static", "css", "main.css"));
		const scriptUri = this._panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, "dist", "webview", "static", "js", "main.js"));

		this._panel.webview.html = `
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

        const subscriptions: any[] = [];
        
		const workspaceViewObserver = new WorkspaceViewChangedObserver(this._panel);
		const workspaceElementHoverObserver = new WorkspaceElementHoveredObserver();
		const workspaceObservable = createWorkspacePreviewObservable(this._panel);
		subscriptions.push(workspaceObservable.subscribe(workspaceViewObserver));
		subscriptions.push(workspaceObservable.subscribe(workspaceElementHoverObserver));

		const textDocumentObserver = new TextEditorDocumentChangedObserver(this._panel);
		const textEditorObservable = createTextEditorDocumentObservable();
		subscriptions.push(textEditorObservable.subscribe());

		if (vscode.window.activeTextEditor) {
			// NOTE: push syntetic event for initial parsing and publishing to the webview
			const structurizr = vscode.window.activeTextEditor.document?.getText();
			textDocumentObserver.next(createEditorDocumentChangedEvent(structurizr));
			
			// NOTE: push syntetic event for initial workspace view auto layout
			workspaceViewObserver.next(createWorkspaceViewChangedEvent(undefined as any));
		}

		const disposables = subscriptions.map(x => new vscode.Disposable(() => x.unsubscribe()));
		this._context.subscriptions.push(...disposables);

		this._panel.onDidDispose(() => {
            subscriptions.forEach(x => x.unsubscribe());
            this._panel = undefined;
		});
    }
}