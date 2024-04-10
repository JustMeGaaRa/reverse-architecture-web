import { IElementVisitor, IModel, ISupportVisitor, IWorkspaceSnapshot } from "../interfaces";
import { RelationshipType } from "../types";

export class ModelViewStrategy implements ISupportVisitor {
    constructor(
        private workspace: IWorkspaceSnapshot,
    ) {}

    public static PlaceholderModelWorkspaceId = "model-workspace-default-node";

    accept(visitor: IElementVisitor): void {
        visitor.visitWorkspace(this.workspace)
        this.workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(this.workspace.model.softwareSystems)
            .forEach((softwareSystem, index) => {
                softwareSystem.groups
                    .flatMap(group => group.containers)
                    .concat(softwareSystem.containers)
                    .forEach((container, index) => {
                        container.groups
                            .flatMap(group => group.components)
                            .concat(container.components)
                            .forEach((component, index) => {
                                visitor.visitComponent(component)
                                visitor.visitRelationship({
                                    type: RelationshipType.Relationship,
                                    sourceIdentifier: container.identifier,
                                    targetIdentifier: component.identifier,
                                    tags: []
                                })
                            });
                        
                        visitor.visitContainer(container)
                        visitor.visitRelationship({
                            type: RelationshipType.Relationship,
                            sourceIdentifier: softwareSystem.identifier,
                            targetIdentifier: container.identifier,
                            tags: []
                        })
                    });
                
                visitor.visitSoftwareSystem(softwareSystem)
                visitor.visitRelationship({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: ModelViewStrategy.PlaceholderModelWorkspaceId,
                    targetIdentifier: softwareSystem.identifier,
                    tags: []
                })
            });
        
        this.workspace.model.people
            .forEach((person, index) => {    
                visitor.visitPerson(person)
                visitor.visitRelationship({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: ModelViewStrategy.PlaceholderModelWorkspaceId,
                    targetIdentifier: person.identifier,
                    tags: []
                })
            });
    }
}