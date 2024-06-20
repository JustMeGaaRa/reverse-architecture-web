import {
	createEditorDocumentChangedEvent,
	createEditorWorkspaceLayoutComputedEvent,
	createEditorWorkspaceParsedEvent,
	createEditorWorkspaceViewSetEvent,
	EventName,
	VscodeExtensionEvent
} from "@restruct/vscode-communication";
import {
	createDefaultWorkspace,
	IWorkspaceSnapshot,
	ViewDefinition
} from "@structurizr/dsl";
import { parseWorkspace } from "@structurizr/parser";
import {
	createTextEditorDocumentObservable,
	createWorkspacePreviewObservable,
    computeViewAutoLayout
} from "./utils";
import { Subject } from "rxjs";
import * as vscode from "vscode";

export class WorkspacePreviewSynchronizer {
    private readonly _panel: vscode.WebviewPanel;
    private readonly _subscriptions: any[] = [];
	private _workspace: IWorkspaceSnapshot;
	private _currentView: ViewDefinition | undefined;
    
    constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;
		this._workspace = createDefaultWorkspace();
    }

    public initialize(structurizr: string) {
		const _textEditorChannel = new Subject<VscodeExtensionEvent>();
		const textEditorDocumentObservable = createTextEditorDocumentObservable();
		const workspacePreviewObservable = createWorkspacePreviewObservable(this._panel);

        const parseWorkspaceHandler = (event: VscodeExtensionEvent) => {
            if (event.type === EventName.EDITOR_DOCUMENT_CHANGED) {
                parseWorkspace(
                    event.structurizr,
                    (error) => {
                        /* TODO: report syntax errors to vscode */
                    },
                    (workspace) => {
                        this._workspace = workspace;
                        const nextEvent = createEditorWorkspaceParsedEvent(workspace);
                        this._panel?.webview.postMessage(nextEvent);
                        _textEditorChannel.next(nextEvent);
                    }
                );
            }
        };

        const setCurrentViewHandler = (event: VscodeExtensionEvent) => {
            if (event.type === EventName.WORKSPACE_VIEW_CHANGED) {
                this._currentView = event.view;
                const nextEvent = createEditorWorkspaceViewSetEvent(this._workspace, event.view);
                _textEditorChannel.next(nextEvent);
            }
        };
        
        const computeLayoutHandler = (event: VscodeExtensionEvent) => {
            if (event.type === EventName.EDITOR_WORKSPACE_VIEW_SET) {
                computeViewAutoLayout(event.workspace, event.view).then(metadata => {
                    const nextEvent = createEditorWorkspaceLayoutComputedEvent(event.view, metadata);
                    this._panel?.webview.postMessage(nextEvent);
                });
            }
        };

		this._subscriptions.push(
            textEditorDocumentObservable.subscribe(_textEditorChannel),
            workspacePreviewObservable.subscribe(setCurrentViewHandler),
            _textEditorChannel.subscribe(parseWorkspaceHandler),
            _textEditorChannel.subscribe(setCurrentViewHandler),
            _textEditorChannel.subscribe(computeLayoutHandler),
        );
        
        // NOTE: push syntetic event for initial parsing and publishing to the webview
        setTimeout(() => _textEditorChannel.next(createEditorDocumentChangedEvent(structurizr)), 500);
    }

    public dispose() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}