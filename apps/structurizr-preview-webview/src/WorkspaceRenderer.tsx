import {
    createDefaultWorkspace,
    IWorkspaceSnapshot,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import { parseStructurizr } from "@structurizr/parser";
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
    Workspace,
} from "@structurizr/react";
import { FC, useEffect } from "react";

import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';
import { useWorkspaceNavigation } from "./WorkspaceNavigationProvider";

type Message = {
    command: "update";
    content?: string;
}

export const WorkspaceRenderer: FC = () => {
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView: view, setCurrentView } = useWorkspaceNavigation();

    useEffect(() => {
        const tryParseWorkspace = (structurizr: string): [boolean, IWorkspaceSnapshot] => {
            let successfull = false;
            let workspace: IWorkspaceSnapshot;

            try {
                workspace = parseStructurizr(structurizr);
                successfull = true;
            } catch (error) {
                workspace = undefined;
                successfull = false;
            }

            return [successfull, workspace];
        }

        const eventHandler = (event: MessageEvent<Message>) => {
            switch (event.data.command) {
                case "update":
                    console.log("Received update message");
                    const [successfull, workspace] = tryParseWorkspace(event.data.content);

                    if (successfull) {
                        console.log("Parsed workspace", workspace);
                        setWorkspace(workspace);
                        setCurrentView(workspace.views.systemLandscape);
                    }
                    break;
            }
        }

        window.addEventListener("message", eventHandler);

        return () => {
            window.removeEventListener("message", eventHandler);
        }
    }, [setCurrentView, setWorkspace]);

    return (
        <Workspace workspace={workspace}>
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

                    {/* <ElementModelCollapseControls />
                    <ElementModelFlowControls onHandleClick={onViewFlowClick} />
                    <ElementViewNavigationControls /> */}
                </Model>
            )}
            <Views>
                {view !== undefined && view.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView view={[workspace.views.systemLandscape].find(x => x.key === view.key) ?? view}>
                        {/* <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar /> */}
                    </SystemLandscapeView>
                )}
                {view !== undefined && view.type === ViewType.SystemContext && (
                    <SystemContextView view={workspace.views.systemContexts.find(x => x.key === view.key) ?? view}>
                        {/* <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar /> */}
                    </SystemContextView>
                )}
                {view !== undefined && view.type === ViewType.Container && (
                    <ContainerView view={workspace.views.containers.find(x => x.key === view.key) ?? view}>
                        {/* <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar /> */}
                    </ContainerView>
                )}
                {view !== undefined && view.type === ViewType.Component && (
                    <ComponentView view={workspace.views.components.find(x => x.key === view.key) ?? view}>
                        {/* <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar /> */}
                    </ComponentView>
                )}
                {view !== undefined && view.type === ViewType.Deployment && (
                    <DeploymentView view={workspace.views.deployments.find(x => x.key === view.key) ?? view}>
                        {/* <ElementViewNavigationControls />
                        <ElementDiagramFlowControls onHandleClick={onViewFlowClick} />
                        <ElementOptionsToolbar /> */}
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
                
            </Views>
        </Workspace>
    )
}