import {
    IElement,
    IRelationship,
    IWorkspaceSnapshot,
    Position,
    Size,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import {
    Component,
    ComponentView,
    Container,
    ContainerInstance,
    ContainerView,
    DeploymentEnvironment,
    DeploymentNode,
    DeploymentView,
    ElementStyle,
    Group,
    InfrastructureNode,
    Model,
    Person,
    Relationship,
    RelationshipStyle,
    SoftwareSystem,
    SoftwareSystemInstance,
    Styles,
    SystemContextView,
    SystemLandscapeView,
    Theme,
    Themes,
    Views,
    Workspace
} from "@structurizr/react";
import { FC, PropsWithChildren } from "react";
import { CommentThread } from "../../comments";
import { ElementDiagramFlowControls, ElementViewNavigationControls } from "./ElementDiagramFlowControls";
import { ElementModelCollapseControls, ElementModelFlowControls } from "./ElementModelFlowControls";
import { ElementOptionsToolbar } from "./ElementOptionsToolbar";

export const WorkspaceRenderer: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    view: ViewDefinition;
    discussions?: CommentThread[];
    onElementClick?: (element: IElement, relativePosition: Position) => void;
    onElementDragStart?: (element: IElement) => void;
    onElementDrag?: (element: IElement) => void;
    onElementDragStop?: (element: IElement, position: Position) => void;
    onElementDimensionsChange?: (element: IElement, dimensions: Size) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
    onViewClick?: (relativePosition: Position) => void;
    onViewFlowClick?: (sourceElement: IElement, relativePosition: Position) => void;
}>> = ({
    children,
    workspace,
    view,
    onElementClick,
    onElementDragStart,
    onElementDrag,
    onElementDragStop,
    onElementDimensionsChange,
    onElementsConnect,
    onViewClick,
    onViewFlowClick
}) => {
    return (
        <Workspace
            workspace={workspace}
            onElementClick={onElementClick}
            onElementDragStart={onElementDragStart}
            onElementDrag={onElementDrag}
            onElementDragStop={onElementDragStop}
            onElementDimensionsChange={onElementDimensionsChange}
            onElementsConnect={onElementsConnect}
            onViewClick={onViewClick}
        >
            {view !== undefined && view?.type === ViewType.Model && (
                <Model>
                    {workspace?.model?.groups?.map(group => (
                        <Group key={group.identifier} group={group}>

                        </Group>
                    ))}
                    {workspace?.model?.people?.map(person => (
                        <Person key={person.identifier} person={person}>
                            
                        </Person>
                    ))}
                    {workspace?.model?.softwareSystems?.map(softwareSystem => (
                        <SoftwareSystem key={softwareSystem.identifier} softwareSystem={softwareSystem}>
                            {softwareSystem.containers.map(container => (
                                <Container key={container.identifier} container={container}>
                                    {container.components.map(component => (
                                        <Component key={component.identifier} component={component}>

                                        </Component>
                                    ))}
                                </Container>
                            ))}
                        </SoftwareSystem>
                    ))}
                    {workspace?.model?.deploymentEnvironments?.map(environment => (
                        <DeploymentEnvironment key={environment.identifier} deploymentEnvironment={environment}>
                            {environment.deploymentNodes.map(deploymentNode => (
                                <DeploymentNode key={deploymentNode.identifier} deploymentNode={deploymentNode}>
                                    {deploymentNode.infrastructureNodes.map(infrastructureNode => (
                                        <InfrastructureNode key={infrastructureNode.identifier} infrastructureNode={infrastructureNode}>

                                        </InfrastructureNode>
                                    ))}
                                    {deploymentNode.softwareSystemInstances.map(softwareSystemInstance => (
                                        <SoftwareSystemInstance key={softwareSystemInstance.identifier} softwareSystemInstance={softwareSystemInstance}>

                                        </SoftwareSystemInstance>
                                    ))}
                                    {deploymentNode.containerInstances.map(containerInstance => (
                                        <ContainerInstance key={containerInstance.identifier} containerInstance={containerInstance}>

                                        </ContainerInstance>
                                    ))}
                                </DeploymentNode>
                            ))}
                        </DeploymentEnvironment>
                    ))}
                    {workspace?.model?.relationships?.map(relationship => (
                        <Relationship key={relationship.sourceIdentifier} relationship={relationship}>

                        </Relationship>
                    ))}

                    <ElementModelCollapseControls />
                    <ElementModelFlowControls onHandleClick={onViewFlowClick} />
                    <ElementViewNavigationControls />
                </Model>
            )}
            <Views>
                {view !== undefined && view.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView view={[workspace.views.systemLandscape].find(x => x.key === view.key) ?? view}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemLandscapeView>
                )}
                {view !== undefined && view.type === ViewType.SystemContext && (
                    <SystemContextView view={workspace.views.systemContexts.find(x => x.key === view.key) ?? view}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemContextView>
                )}
                {view !== undefined && view.type === ViewType.Container && (
                    <ContainerView view={workspace.views.containers.find(x => x.key === view.key) ?? view}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ContainerView>
                )}
                {view !== undefined && view.type === ViewType.Component && (
                    <ComponentView view={workspace.views.components.find(x => x.key === view.key) ?? view}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ComponentView>
                )}
                {view !== undefined && view.type === ViewType.Deployment && (
                    <DeploymentView view={workspace.views.deployments.find(x => x.key === view.key) ?? view}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </DeploymentView>
                )}
                <Styles>
                    {workspace?.views.configuration?.styles?.elements?.map(elementStyle => (
                        <ElementStyle key={""} style={elementStyle}>

                        </ElementStyle>
                    ))}
                    {workspace?.views.configuration?.styles?.relationships?.map(relationshipStyle => (
                        <RelationshipStyle key={""} style={relationshipStyle}>

                        </RelationshipStyle>
                    ))}
                </Styles>
                <Themes>
                    {workspace?.views.configuration?.themes?.map(theme => (
                        <Theme key={theme} url={theme}>

                        </Theme>
                    ))}
                </Themes>

                {children}
            </Views>
        </Workspace>
    )
}