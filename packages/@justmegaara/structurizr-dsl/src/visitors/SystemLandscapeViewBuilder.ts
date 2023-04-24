import { GenericView } from "../view/GenericView";
import { Workspace } from "../workspace/Workspace";
import { IViewBuilder, ViewBuilderResult } from "./IViewBuilder";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { RelationshipElement } from "./RelationshipElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";

export class SystemLandscapeViewBuilder implements IViewBuilder {
    constructor(
        private workspace: Workspace,
        private view: GenericView
    ) {}

    build(visitor: IVisitor): ViewBuilderResult {
        const path = [];

        // include all people that are directly connected to the current software system
        this.workspace.model.people
            .forEach(person => new PersonElement(person).accept(visitor));

        // include the current software and all software systems
        // that are directly connected to the current software system
        this.workspace.model.softwareSystems
            .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
        
        this.workspace.model.relationships
            .filter(edge => this.view.layout[edge.sourceIdentifier] && this.view.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));

        path.push({
            type: "System Landscape",
            identifier: this.workspace.model.enterprise.name,
            title: this.workspace.model.enterprise.name
        });
        
        return {
            viewPath: { path }
        }
    }
}