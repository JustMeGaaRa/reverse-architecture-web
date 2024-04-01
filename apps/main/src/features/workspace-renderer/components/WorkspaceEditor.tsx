import {
    emptyWorkspace,
    IViewDefinition,
    IWorkspaceSnapshot,
    ViewType
} from "@structurizr/dsl";
import {
    ActionType,
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
    Workspace,
    workspaceReducer
} from "@structurizr/react";
import { Workspace as YWorkspace } from "@structurizr/y-workspace";
import { useYjsCollaborative } from "@yjs/react";
import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { CommentThread } from "../../comments";
import { useWorkspaceEditor } from "../hooks";
import { ElementDiagramFlowControls, ElementViewNavigationControls } from "./ElementDiagramFlowControls";
import { ElementModelCollapseControls, ElementModelFlowControls } from "./ElementModelFlowControls";
import { ElementOptionsToolbar } from "./ElementOptionsToolbar";

export const WorkspaceEditor: FC<PropsWithChildren<{
    workspace: YWorkspace;
    view: IViewDefinition;
    discussions?: CommentThread[];
}>> = ({
    children,
    view,
}) => {
    const {
        onElementClick,
        onElementDragStart,
        onElementDrag,
        onElementDragStop,
        onElementsConnect,
        onViewClick,
        onViewFlowClick
    } = useWorkspaceEditor();

    const { document } = useYjsCollaborative();
    const [ workspace, dispatch ] = useReducer(workspaceReducer, emptyWorkspace());
    // const [ workspace, dispatch ] = useReducer(collaborative(workspaceReducer, document), emptyWorkspace());

    useEffect(() => {
        if (document) {
            const yworkspace = new YWorkspace(document);

            const onUpdateWorksapce = () => {
                dispatch({
                    type: ActionType.SET_WORKSPACE,
                    payload: {
                        workspace: yworkspace.toSnapshot()
                    }
                });
            }

            yworkspace.subscribe(onUpdateWorksapce);

            return () => {
                yworkspace.unsubscribe(onUpdateWorksapce);
            }
        }
    }, [document]);

    return (
        <Workspace
            workspace={workspace}
            onElementClick={onElementClick}
            onElementDragStart={onElementDragStart}
            onElementDrag={onElementDrag}
            onElementDragStop={onElementDragStop}
            onElementsConnect={onElementsConnect}
            onViewClick={onViewClick}
        >
            {view !== undefined && view?.type === ViewType.Model && (
                <Model model={workspace?.model}>
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
                </Model>
            )}
            <Views>
                {view !== undefined && view.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView
                        key={workspace.views.systemLandscape?.identifier}
                        view={workspace?.views.systemLandscape}
                    >
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemLandscapeView>
                )}
                {view !== undefined && view.type === ViewType.SystemContext && (
                    <SystemContextView
                        key={view.identifier}
                        view={workspace.views.systemContexts.find(view => view.identifier === view.identifier)}
                    >
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </SystemContextView>
                )}
                {view !== undefined && view.type === ViewType.Container && (
                    <ContainerView
                        key={view.identifier}
                        view={workspace.views.containers.find(view => view.identifier === view.identifier)}
                    >
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ContainerView>
                )}
                {view !== undefined && view.type === ViewType.Component && (
                    <ComponentView
                        key={view.identifier}
                        view={workspace.views.components.find(view => view.identifier === view?.identifier)}
                    >
                        <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar />
                    </ComponentView>
                )}
                {view !== undefined && view.type === ViewType.Deployment && (
                    <DeploymentView
                        key={view.identifier}
                        view={workspace.views.deployments.find(view => view.identifier === view?.identifier)}
                    >
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