import {
    Drawio,
    MXCell,
} from "@justmegaara/mxgraph";
import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    ISupportVisitor,
    SystemContextView,
    SystemContextViewStrategy,
    Workspace
} from "@structurizr/dsl";
import { DrawioExportVisitor } from "./DrawioExportVisitor";
import { DrawioDiagramBuilder } from "./DrawioDiagramBuilder";
import { IExportClient } from "../shared/IExportClient";
import { XMLBuilder } from "fast-xml-parser";
import { v4 } from "uuid";

export class DrawioExportClient implements IExportClient {
    export(workspace: Workspace): string {
        const createView = (view: SystemContextView, client: ISupportVisitor) => {
            const defaultParent: MXCell = {
                _id: v4()
            };
            const defaultParent1: MXCell = {
                _id: v4(),
                _parent: defaultParent._id
            };
            
            const builder = new DrawioDiagramBuilder(`[${view.type}] ${view.title}`);
            const visitor = new DrawioExportVisitor(view, defaultParent1._id, builder);
            builder.addMxCells(defaultParent);
            builder.addMxCells(defaultParent1);
            client.accept(visitor);
            return builder.build();
        }

        const drawio: Drawio = {
            mxfile: {
                _modified: new Date(),
                _etag: v4(),
                _compressed: false,
                _pages: "1",
                _agent: "Reverse Architecture (Web)",
                _host: "reversearchitecture.io",
                _type: "browser",
                diagram: [
                    // fromView(this.workspace, view, new SystemContextViewStrategy(workspace, view)),
                    ...workspace.views.systemContexts.map(view => {
                        return createView(view, new SystemContextViewStrategy(workspace, view))
                    }),
                    ...workspace.views.containers.map(view => {
                        return createView(view, new ContainerViewStrategy(workspace, view))
                    }),
                    ...workspace.views.components.map(view => {
                        return createView(view, new ComponentViewStrategy(workspace, view))
                    }),
                    ...workspace.views.deployments.map(view => {
                        return createView(view, new DeploymentViewStrategy(workspace, view, view.environment))
                    })
                ]
            }
        };
    
        const xmlBuilder = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "_",
            format: true,
            suppressEmptyNode: true
        });
        
        return xmlBuilder.build(drawio);
    }
}