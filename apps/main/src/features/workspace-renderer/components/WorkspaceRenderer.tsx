import {
    IViewDefinition,
    IWorkspaceSnapshot,
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
import { ElementViewNavigationControls } from "./ElementDiagramFlowControls";

export const WorkspaceRenderer: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    view: IViewDefinition;
    discussions?: CommentThread[];
}>> = ({
    children,
    workspace,
    view,
}) => {
    return (
        <Workspace workspace={workspace}>
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

                    <ElementViewNavigationControls />
                </Model>
            )}
            <Views>
                {view !== undefined && view.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView
                        key={workspace.views.systemLandscape?.identifier}
                        view={workspace?.views.systemLandscape}
                    >
                        <ElementViewNavigationControls />
                    </SystemLandscapeView>
                )}
                {view !== undefined && view.type === ViewType.SystemContext && (
                    <SystemContextView
                        key={view.identifier}
                        view={workspace.views.systemContexts.find(view => view.identifier === view.identifier)}
                    >
                        <ElementViewNavigationControls />
                    </SystemContextView>
                )}
                {view !== undefined && view.type === ViewType.Container && (
                    <ContainerView
                        key={view.identifier}
                        view={workspace.views.containers.find(view => view.identifier === view.identifier)}
                    >
                        <ElementViewNavigationControls />
                    </ContainerView>
                )}
                {view !== undefined && view.type === ViewType.Component && (
                    <ComponentView
                        key={view.identifier}
                        view={workspace.views.components.find(view => view.identifier === view?.identifier)}
                    >
                        <ElementViewNavigationControls />
                    </ComponentView>
                )}
                {view !== undefined && view.type === ViewType.Deployment && (
                    <DeploymentView
                        key={view.identifier}
                        view={workspace.views.deployments.find(view => view.identifier === view?.identifier)}
                    >
                        <ElementViewNavigationControls />
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