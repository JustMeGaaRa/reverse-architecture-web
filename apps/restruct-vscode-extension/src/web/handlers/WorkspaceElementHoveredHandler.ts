import { EventName, IObservable, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import * as vscode from "vscode";

export class WorkspaceElementHoveredHandler implements IObservable<WorkspacePreviewEvent> {
    onNext(event: WorkspacePreviewEvent) {
        if (event.type === EventName.ELEMENT_HOVERED) {
            console.log("Element hovered", event);
            
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

    onError(error: Error) {
        console.error(error);
    }
}