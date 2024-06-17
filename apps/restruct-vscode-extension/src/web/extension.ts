import * as vscode from 'vscode';
import {
	CommunicationChannel,
	MessageType,
	WorkspaceEvent
} from '@restruct/vscode-communication';

export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel;
	let channel: CommunicationChannel;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const previewDisposable = vscode.commands.registerCommand('structurizr-preview-restruct.preview', () => {
		// The code you place here will be executed every time your command is executed
		// if (previewPanel) {
		// 	previewPanel.reveal(vscode.ViewColumn.Beside, true);
		// 	return;
		// }

		panel = vscode.window.createWebviewPanel(
			"restruct",
			"Structurizr Preview by Restruct",
			vscode.ViewColumn.Beside,
			{ enableScripts: true, retainContextWhenHidden: true }
		);
		channel = new CommunicationChannel(context, panel);
		
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

		if (vscode.window.activeTextEditor) {
			const structurizr = vscode.window.activeTextEditor.document.getText();
			channel.publishMessage({ type: MessageType.DOCUMENT_CHANGED, structurizr });
		}

		channel.subscribeMessage((message: WorkspaceEvent) => {
			console.log("Hovered", message);
			switch (message.type) {
				case MessageType.ELEMENT_HOVERED:
					if (vscode.window.activeTextEditor) {
						console.log("Handling", message);
						const decorationType = vscode.window.createTextEditorDecorationType({
							backgroundColor: 'rgba(255,255,0,0.3)',
							isWholeLine: true,
							
						});
						const start = new vscode.Position(message.range[0].start.line, message.range[0].start.character);
						const end = new vscode.Position(message.range[0].end.line, message.range[0].end.character);
						const range = new vscode.Range(start, end);
						vscode.window.activeTextEditor.setDecorations(decorationType, [range]);
					}
					break;
			}
		});
		
		// const htmlUrl = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", "index.html"));

		// const readFileContents = async (uri: vscode.Uri) => {
		// 	const fileCOntentBytes = await vscode.workspace.fs.readFile(uri);
		// 	return Buffer.from(fileCOntentBytes).toString('utf8');
		// };

		// readFileContents(htmlUrl).then((content) => {
		// 	console.log("htmlUrl", htmlUrl);
		// 	content = content
		// 		.replace(/<link href="static\/css\/main.css" rel="stylesheet">/g, `<link href="${cssUri}" rel="stylesheet">`)
		// 		.replace(/<script defer="defer" src="static\/js\/main.js"><\/script>/g, `<script defer="defer" src="${scriptUri}"></script>`);
		// 	// content = content.replace(/(<link.*?href="|<script.*?src="|<img.*?src=")([^"]*)"/g, (subString, prefix, uri) => {
		// 	// 	let resourcePath = vscode.Uri.file(path.join(path.dirname(htmlUrl.path), uri));
		// 	// 	let webviewUri = panel.webview.asWebviewUri(resourcePath);
		// 	// 	return `${prefix}${webviewUri}"`;
		// 	// });
		// 	panel.webview.html = content;

		// 	// NOTE: publish the initial state for first render
		// 	if (vscode.window.activeTextEditor) {
		// 		const structurizr = vscode.window.activeTextEditor.document.getText();
		// 		channel.publishMessage({ type: MessageType.DOCUMENT_CHANGED, structurizr });
		// 	}
		// });
	});

	// const selectionDisposable = vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
	// 	if (vscode.window.activeTextEditor) {
	// 		const decorationType = vscode.window.createTextEditorDecorationType({
	// 			backgroundColor: 'rgba(255,255,0,0.3)',
	// 			isWholeLine: false
	// 		});
	// 		const selection = vscode.window.activeTextEditor.selection;
	// 		const range = new vscode.Range(selection.start, selection?.end);
	// 		vscode.window.activeTextEditor.setDecorations(decorationType, [range]);
	// 	}
	// });

	const documentDisposable = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
		if (event.document) {
			const structurizr = event.document.getText();
			channel.publishMessage({ type: MessageType.DOCUMENT_CHANGED, structurizr });
		}
	});

	context.subscriptions.push(
		documentDisposable,
		// selectionDisposable,
		previewDisposable
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}