import { EventName, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import { Observer } from "rxjs";
import * as vscode from "vscode";

export class WorkspaceElementHoveredObserver implements Observer<WorkspacePreviewEvent> {
    next(event: WorkspacePreviewEvent) {
        if (event.type === EventName.WORKSPACE_ELEMENT_HOVERED) {
            if (vscode.window.activeTextEditor) {
                const decorationType = vscode.window.createTextEditorDecorationType({
                    backgroundColor: 'rgba(255,255,0,0.3)',
                    isWholeLine: true,
                    
                });
                const start = new vscode.Position(event.range[0].start.line, event.range[0].start.character);
                const end = new vscode.Position(event.range[0].end.line, event.range[0].end.character);
                const range = new vscode.Range(start, end);
                vscode.window.activeTextEditor.setDecorations(decorationType, [range]);
            }
        }
    }

    error(error: Error) {
        vscode.window.showErrorMessage(error.message);
    }

    complete() {
        console.debug("WorkspaceElementHoveredHandler completed");
    }
}
