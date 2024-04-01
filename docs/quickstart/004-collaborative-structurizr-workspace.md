# Structurizr Workspace - Collaborative Online

Key Points: Ideal for building any kind of interactive real-time collaborative apps based on C4 model and structurizr.

```jsx
import { YjsDocumentProvider, YjsWebrtcProviderProvider } from "@yjs/react";
import { Workspace, WorkspaceProvider, emptyWorkspace, workspaceReducer } from "@structurizr/react";
import { WorksapceRoom, collaborative } from "@structurizr/live";
import type { Workspace as YWorkspace } from "@structurizr/live";
import { FC, useEffect, useState, useReducer } from "react";

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
    const [ workspace, dispatch ] = useReducer(collaborative(workspaceReducer, document), emptyWorkspace());

    useEffect(() => {
        const yworkspace = new YWorkspace(document);
        
        const onUpdateWorksapce = () => {
            dispatch({ type: "SET_WORKSPACE", payload: yworkspace.toSnapshot() });
        }

        yworkspace.subscribe(onUpdateWorksapce);

        return () => {
            yworkspace.unsubscribe(onUpdateWorksapce);
        }
    }, [document]);

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
                    <Deployment key={view.identifier} value={view}>
                        <Include value={view.include} />
                        <Animation value={view.animation} />
                        <AutoLayout value={view.autoLayout} />
                    </Deployment>
                ))}
            </Views>
        </Workspace>
    )
}
```