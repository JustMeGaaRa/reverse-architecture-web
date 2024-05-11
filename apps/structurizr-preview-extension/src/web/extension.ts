// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "structurizr-preview-restruct" is now active in the web extension host!');
	let previewPanel: vscode.WebviewPanel;

	const readFileContents = async (uri: vscode.Uri) => {
		const fileCOntentBytes = await vscode.workspace.fs.readFile(uri);
		return Buffer.from(fileCOntentBytes).toString('utf8');
	};

	const publishFileContentsMessage = (fileContent: string) => {
		previewPanel.webview.postMessage({
			command: "update",
			content: fileContent
		});
	};

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const previewDisposable = vscode.commands.registerCommand('structurizr-preview-restruct.preview', () => {
		// The code you place here will be executed every time your command is executed
		previewPanel = vscode.window.createWebviewPanel(
			"restruct",
			"Structurizr Preview by Restruct",
			vscode.ViewColumn.Beside,
			{ enableScripts: true }
		);
		
		const cssUri = previewPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "static", "css", "main.7045b1c9.css"));
		const scriptUri = previewPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "static", "js", "main.c2ae610f.js"));

		previewPanel.webview.html = `
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

		if (vscode.window.activeTextEditor) {
			publishFileContentsMessage(vscode.window.activeTextEditor.document.getText());
		}
	});

	const documentDisposable = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
		if (event.document) {
			publishFileContentsMessage(event.document.getText());
		}
	});

	context.subscriptions.push(
		documentDisposable,
		previewDisposable
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}