# Structurizr Workspace - Collaborative Online

Key Points: Ideal for building any kind of interactive real-time collaborative apps based on C4 model and structurizr.

```jsx
import { WorksapceRoom, collaborativeMiddleware, useOnWorkspaceSync } from "@structurizr/live";
import { Workspace, WorkspaceProvider, emptyWorkspace, workspaceReducer } from "@structurizr/react";
import { YjsDocumentProvider, YjsWebrtcProviderProvider, useYjsCollaborative } from "@yjs/react";
import { FC, useCallback, useReducer } from "react";

export const App: FC = () => {
    <YjsDocumentProvider>
        <YjsWebrtcProviderProvider>
            <WorksapceRoom options={ roomId: "$ROOM_ID%", password: "%PASSWORD%" }>
                <WorkspaceProvider>
                    <WorkspaceEditor />
                </WorkspaceProvider>
            </WorksapceRoom>
        </YjsWebrtcProviderProvider>
    </YjsDocumentProvider>
}

export const WorkspaceEditor: FC = () => {
    const { document } = useYjsCollaborative();
    const [ workspace, dispatch ] = useReducer(
        collaborativeMiddleware(workspaceReducer, document),
        emptyWorkspace()
    );

    useOnWorkspaceSync(document, {
        onWorkspaceUpdate: useCallback((workspace: IWorkspaceSnapshot) => {
            dispatch({
                type: ActionType.SET_WORKSPACE,
                payload: { workspace: workspace }
            });
        }, [])
    });

    return (
        <Workspace value={workspace}>
            <Model>
                {workspace.model.people.map(person => (
                    <Person key={person.identifer} value={person} />
                ))}
                {workspace.model.groups.map(group => (
                    <Group key={group.identifier} value={group}>
                        {group.people.map(person => (
                            <Person key={person.identifer} value={person} />
                        ))}
                        {group.softwareSystems.map(softwareSystem => (
                            <SoftwareSystem key={softwareSystem.identifer} value={softwareSystem}>
                                {softwareSystem.containers.map(container => (
                                    <Container key={container.identifier} value={container}>
                                        {container.components.map(component => (
                                            <Component key={component.identifier} value={component} />
                                        ))}
                                    </Container>
                                ))}
                            </SoftawareSystem>
                        ))}
                    </Group>
                ))}
                {workspace.model.relationships.map(relationshp => (
                    <Relationship key={relationshp.identifier} value={relationshp} />
                ))}
                {workspace.model.deploymentEnvironment.map(deploymentEnvironment => (
                    <DeploymentEnvironment key={deploymentEnvironment.identifier} value={deploymentEnvironment}>
                        {deploymentEnvironment.deploymentNodes.map(deploymentNode => (
                            <DeploymentNode key={deploymentNode.identifier} value={deploymentNode}>
                                {deploymentNode.deploymentNodes.map(deploymentNode => (
                                    <DeploymentNode key={deploymentNode.identifier} value={deploymentNode}>
                                        {deploymentNode.softwareSystemInstances.map(softwareSystemInstance => (
                                            <SoftwareSystemInstance key={softwareSystemInstance.identifier} value={softwareSystemInstance} />
                                        ))}
                                        {deploymentNode.containerInstances.map(containerInstance => (
                                            <ContainerInstance key={containerInstance.identifier} value={containerInstance} />
                                        ))}
                                    </DeploymentNode>
                                ))}
                                {deploymentNode.softwareSystemInstances.map(softwareSystemInstance => (
                                    <SoftwareSystemInstance key={softwareSystemInstance.identifier} value={softwareSystemInstance} />
                                ))}
                                {deploymentNode.containerInstances.map(containerInstance => (
                                    <ContainerInstance key={containerInstance.identifier} value={containerInstance} />
                                ))}
                            </DeploymentNode>
                        ))}
                    </DeploymentEnvironment>
                ))}
            </Model>
            <Views>
                {/* NOTE: you just need to render any single view at a time, otherwise multiple views will be rendered */}
                {workspace.views.systemLandscape && (
                    <SystemLandscapeView key={workspace.views.systemLandscape.identifier} value={workspace.views.systemLandscape}>
                        <Include value={workspace.views.systemLandscape.include} />
                        <AutoLayout value={workspace.views.systemLandscape.autoLayout} />
                    </SystemLandscapeView>
                )}
                {workspace.views.systemContext.map(view => (
                    <SystemContextView key={view.identifier} value={view}>
                        <Include value={view.include} />
                        <Animation value={view.animation} />
                        <AutoLayout value={view.autoLayout} />
                    </SystemContextView>
                ))}
                {workspace.views.containers.map(view => (
                    <ContainerView key={view.identifier} value={view}>
                        <Include value={view.include} />
                        <Animation value={view.animation} />
                        <AutoLayout value={view.autoLayout} />
                    </ContainerView>
                ))}
                {workspace.views.components.map(view => (
                    <ComponentView key={view.identifier} value={view}>
                        <Include value={view.include} />
                        <Animation value={view.animation} />
                        <AutoLayout value={view.autoLayout} />
                    </ComponentView>
                ))}
                {workspace.views.deployments.map(view => (
                    <DeploymentView key={view.identifier} value={view}>
                        <Include value={view.include} />
                        <Animation value={view.animation} />
                        <AutoLayout value={view.autoLayout} />
                    </DeploymentView>
                ))}
            </Views>
        </Workspace>
    )
}
```