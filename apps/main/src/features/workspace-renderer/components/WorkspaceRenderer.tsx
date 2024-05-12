import {
    Dimensions,
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
    useWorkspace,
    Views,
    Workspace
} from "@structurizr/react";
import { FC, PropsWithChildren, useEffect } from "react";
import { CommentThread } from "../../comments";
import { useWorkspaceNavigation } from "../hooks";
import { ElementDiagramFlowControls, ElementViewNavigationControls } from "./ElementDiagramFlowControls";
import { ElementModelCollapseControls, ElementModelFlowControls } from "./ElementModelFlowControls";
import { ElementOptionsToolbar } from "./ElementOptionsToolbar";

export const WorkspaceRenderer: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    view: ViewDefinition;
    discussions?: CommentThread[];
    onElementClick?: (element: IElement, relativePosition: Position) => void;
    onElementPositionChange?: (element: IElement, position: Position) => void;
    onElementDimensionsChange?: (element: IElement, dimensions: Dimensions) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
    onViewClick?: (relativePosition: Position) => void;
    onViewFlowClick?: (sourceElement: IElement, relativePosition: Position) => void;
}>> = ({
    children,
    workspace: initialWorkspace,
    view: initialView,
    onElementClick,
    onElementPositionChange,
    onElementDimensionsChange,
    onElementsConnect,
    onViewClick,
    onViewFlowClick
}) => {
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    
    useEffect(() => setWorkspace(initialWorkspace), [initialWorkspace, setWorkspace]);
    useEffect(() => setCurrentView(initialView), [initialView, setCurrentView]);

    return (
        <Workspace
            workspace={workspace}
            onElementClick={onElementClick}
            onElementPositionChange={onElementPositionChange}
            onElementDimensionsChange={onElementDimensionsChange}
            onElementsConnect={onElementsConnect}
            onViewClick={onViewClick}
        >
            {currentView !== undefined && currentView?.type === ViewType.Model && (
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
                {currentView !== undefined && currentView.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView view={[workspace.views.systemLandscape].find(x => x.key === currentView.key) ?? currentView}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemLandscapeView>
                )}
                {currentView !== undefined && currentView.type === ViewType.SystemContext && (
                    <SystemContextView view={workspace.views.systemContexts.find(x => x.key === currentView.key) ?? currentView}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemContextView>
                )}
                {currentView !== undefined && currentView.type === ViewType.Container && (
                    <ContainerView view={workspace.views.containers.find(x => x.key === currentView.key) ?? currentView}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ContainerView>
                )}
                {currentView !== undefined && currentView.type === ViewType.Component && (
                    <ComponentView view={workspace.views.components.find(x => x.key === currentView.key) ?? currentView}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ComponentView>
                )}
                {currentView !== undefined && currentView.type === ViewType.Deployment && (
                    <DeploymentView view={workspace.views.deployments.find(x => x.key === currentView.key) ?? currentView}>
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </DeploymentView>
                )}
                <Styles>
                    {workspace?.views.configuration?.styles?.elements?.map(elementStyle => (
                        <ElementStyle key={elementStyle.tag} style={elementStyle}>

                        </ElementStyle>
                    ))}
                    {workspace?.views.configuration?.styles?.relationships?.map(relationshipStyle => (
                        <RelationshipStyle key={relationshipStyle.tag} style={relationshipStyle}>

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