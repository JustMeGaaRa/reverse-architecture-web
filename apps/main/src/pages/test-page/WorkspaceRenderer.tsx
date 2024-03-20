import * as YStructurizr from "@structurizr/y-workspace";
import {
    Component,
    ComponentView,
    Container,
    ContainerView,
    DeploymentEnvironment,
    DeploymentView,
    ElementStyle,
    Group,
    Model,
    Person,
    Relationship,
    RelationshipStyle,
    SoftwareSystem,
    Styles,
    SystemContextView,
    SystemLandscapeView,
    Theme,
    Themes,
    Views,
    Workspace
} from "@structurizr/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { IWorkspaceSnapshot } from "@structurizr/dsl";

export const WorkspaceRenderer: FC<PropsWithChildren<{ workspace?: YStructurizr.Workspace }>> = ({ workspace, children }) => {
    const [ workspaceSnapshot, setWorkspaceSnapshot ] = useState<IWorkspaceSnapshot>(null);

    useEffect(() => {
        setWorkspaceSnapshot(workspace?.toSnapshot());
    }, [workspace]);

    return (
        <Workspace workspace={workspaceSnapshot}>
            <Model>
                {workspaceSnapshot?.model?.groups?.map(group => (
                    <Group key={group.identifier} group={group}>

                    </Group>
                ))}
                {workspaceSnapshot?.model?.people?.map(person => (
                    <Person key={person.identifier} person={person}>
                        
                    </Person>
                ))}
                {workspaceSnapshot?.model?.softwareSystems?.map(softwareSystem => (
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
                {workspaceSnapshot?.model?.deploymentEnvironments?.map(environment => (
                    <DeploymentEnvironment key={environment.identifier} deploymentEnvironment={environment}>

                    </DeploymentEnvironment>
                ))}
                {workspaceSnapshot?.model?.relationships?.map(relationship => (
                    <Relationship key={relationship.sourceIdentifier} relationship={relationship}>

                    </Relationship>
                ))}
            </Model>
            <Views>
                {[workspaceSnapshot?.views.systemLandscape].map(systemLandscape => (
                    <SystemLandscapeView key={systemLandscape.identifier} view={systemLandscape}>

                    </SystemLandscapeView>
                ))}
                {workspaceSnapshot?.views.systemContexts.map(systemContextView => (
                    <SystemContextView key={systemContextView.identifier} view={systemContextView}>

                    </SystemContextView>                                                                                                
                ))}
                {workspaceSnapshot?.views.containers.map(containerView => (
                    <ContainerView key={containerView.identifier} view={containerView}>

                    </ContainerView>
                ))}
                {workspaceSnapshot?.views.components.map(componentView => (
                    <ComponentView key={componentView.identifier} view={componentView}>

                    </ComponentView>
                ))}
                {workspaceSnapshot?.views.deployments.map(deploymentView => (
                    <DeploymentView key={deploymentView.identifier} view={deploymentView}>

                    </DeploymentView>
                ))}
                <Styles>
                    {workspaceSnapshot?.views.configuration?.styles?.elements?.map(elementStyle => (
                        <ElementStyle key={""} style={elementStyle}>

                        </ElementStyle>
                    ))}
                    {workspaceSnapshot?.views.configuration?.styles?.relationships?.map(relationshipStyle => (
                        <RelationshipStyle key={""} style={relationshipStyle}>

                        </RelationshipStyle>
                    ))}
                </Styles>
                <Themes>
                    {workspaceSnapshot?.views.configuration?.themes?.map(theme => (
                        <Theme key={theme} url={theme}>

                        </Theme>
                    ))}
                </Themes>
            </Views>
            {children}
        </Workspace>
    )
}
