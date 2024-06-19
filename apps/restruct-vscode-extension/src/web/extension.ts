import * as vscode from "vscode";
import { WorkspacePreviewPanel } from "./WorkspacePreviewPanel";

export function activate(context: vscode.ExtensionContext) {
	const workspacePreviewPanel: WorkspacePreviewPanel = new WorkspacePreviewPanel(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const workspacePreviewDisposable = vscode.commands.registerCommand('restruct-structurizr.preview', () => {
		workspacePreviewPanel.show();
	});

	context.subscriptions.push(workspacePreviewDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}