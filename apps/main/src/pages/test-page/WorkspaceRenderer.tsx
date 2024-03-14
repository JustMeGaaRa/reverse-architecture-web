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
import { FC, PropsWithChildren } from "react";

export const WorkspaceRenderer: FC<PropsWithChildren<{ workspace?: YStructurizr.Workspace }>> = ({ workspace, children }) => {
    return (
        <Workspace workspace={workspace}>
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

                    </DeploymentEnvironment>
                ))}
                {workspace?.model?.relationships?.map(relationship => (
                    <Relationship key={relationship.sourceIdentifier} relationship={relationship}>

                    </Relationship>
                ))}
            </Model>
            <Views>
                {workspace?.views.systemLandscape.map(systemLandscape => (
                    <SystemLandscapeView key={systemLandscape.identifier} view={systemLandscape}>

                    </SystemLandscapeView>
                ))}
                {workspace?.views.systemContexts.map(systemContextView => (
                    <SystemContextView key={systemContextView.identifier} view={systemContextView}>

                    </SystemContextView>                                                                                                
                ))}
                {workspace?.views.containers.map(containerView => (
                    <ContainerView key={containerView.identifier} view={containerView}>

                    </ContainerView>
                ))}
                {workspace?.views.components.map(componentView => (
                    <ComponentView key={componentView.identifier} view={componentView}>

                    </ComponentView>
                ))}
                {workspace?.views.deployments.map(deploymentView => (
                    <DeploymentView key={deploymentView.identifier} view={deploymentView}>

                    </DeploymentView>
                ))}
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
            {children}
        </Workspace>
    )
}
