import { createWorkspaceLayoutComputedEvent, EventName, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import { SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { GraphvizLayoutStrategy } from "@structurizr/graphviz-layout";
import { ReactFlowBuilder, ReactFlowVisitor } from "@workspace/core";
import { Observer } from "rxjs";
import * as vscode from "vscode";

export class WorkspaceViewChangedObserver implements Observer<WorkspacePreviewEvent> {
    constructor(
        private readonly panel: vscode.WebviewPanel
    ) {}

    next(event: WorkspacePreviewEvent) {
        if (event.type === EventName.WORKSPACE_VIEW_CHANGED) {
            const workspace = event.workspace;
            
            const viewStrategy = new SystemLandscapeViewStrategy(workspace.model, workspace.views.systemLandscape as any);
            const reactFlowBuilder = new ReactFlowBuilder();
            const reactFlowVisitor = new ReactFlowVisitor(
                workspace.model,
                workspace.views.configuration,
                workspace.views.systemLandscape as any,
                reactFlowBuilder
            );
            viewStrategy?.accept(reactFlowVisitor);
            const reactFlowObject = reactFlowBuilder.build();
            
            const layoutStrategy = new GraphvizLayoutStrategy();
            layoutStrategy
                .execute(reactFlowObject)
                .then(reactFlowAuto => {
                    const metadata = reactFlowAuto.nodes.reduce((elements, node) => ({
                        ...elements,
                        [node.id]: {
                            x: node.position.x,
                            y: node.position.y,
                            height: node.data.height,
                            width: node.data.width,
                        }
                    }), {});;
                    const nextEvent = createWorkspaceLayoutComputedEvent(metadata);
                    this.panel.webview.postMessage(nextEvent);
                });
        }
    }

    error(error: Error) {
        vscode.window.showErrorMessage(error.message);
    }

    complete() {
        console.debug("WorkspaceViewChangedHandler completed");
    }
}
