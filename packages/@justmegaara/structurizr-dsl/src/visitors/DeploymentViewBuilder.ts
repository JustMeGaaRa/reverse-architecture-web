import { GenericView } from "../view/GenericView";
import { Workspace } from "../workspace/Workspace";
import { IViewBuilder, ViewBuilderResult } from "./IViewBuilder";
import { IVisitor } from "./IVisitor";

export class DeploymentViewBuilder implements IViewBuilder {
    constructor(
        private workspace: Workspace,
        private view: GenericView,
        private environment: string
    ) {}

    build(visitor: IVisitor): ViewBuilderResult {
        const path = [];

        path.push({
            type: "Deployment",
            identifier: this.view.identifier,
            title: this.environment
        });

        return {
            viewPath: { path }
        }
    }
}