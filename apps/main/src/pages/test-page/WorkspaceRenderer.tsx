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
    Views,
    Workspace
} from "@structurizr/react";
import { FC, PropsWithChildren } from "react";

export const WorkspaceRenderer: FC<PropsWithChildren<{ workspace: YStructurizr.Workspace }>> = ({ workspace }) => {
    return (
        <Workspace workspace={workspace}>
            <Model model={workspace.model}>
                {workspace.model.groups?.map(group => (
                    <Group key={""} group={group}>

                    </Group>
                ))}
                {workspace.model.people?.map(person => (
                    <Person key={""} person={person}>
                        
                    </Person>
                ))}
                {workspace.model.softwareSystems?.map(softwareSystem => (
                    <SoftwareSystem key={""} softwareSystem={softwareSystem}>
                        {softwareSystem.containers.map(container => (
                            <Container key={""} container={container}>
                                {container.components.map(component => (
                                    <Component key={""} component={component}>

                                    </Component>
                                ))}
                            </Container>
                        ))}
                    </SoftwareSystem>
                ))}
                {workspace.model.deploymentEnvironments?.map(deploymentEnvironment => (
                    <DeploymentEnvironment key={""} deploymentEnvironment={deploymentEnvironment}>

                    </DeploymentEnvironment>
                ))}
                {workspace.model.relationships?.map(relationship => (
                    <Relationship key={""} relationship={relationship}>

                    </Relationship>
                ))}
            </Model>
            <Views views={workspace.views}>
                {workspace.views.systemLandscape.map(systemLandscape => (
                    <SystemLandscapeView key={""} view={systemLandscape}>

                    </SystemLandscapeView>
                ))}
                {workspace.views.systemContexts.map(systemContextView => (
                    <SystemContextView key={""} view={systemContextView}>

                    </SystemContextView>                                                                                                
                ))}
                {workspace.views.containers.map(containerView => (
                    <ContainerView key={""} view={containerView}>

                    </ContainerView>
                ))}
                {workspace.views.components.map(componentView => (
                    <ComponentView key={""} view={componentView}>

                    </ComponentView>
                ))}
                {workspace.views.deployments.map(deploymentView => (
                    <DeploymentView key={""} view={deploymentView}>

                    </DeploymentView>
                ))}
                <Styles styles={workspace.views.configuration?.styles}>
                    {workspace.views.configuration?.styles?.elements?.map(elementStyle => (
                        <ElementStyle key={""} style={elementStyle}>

                        </ElementStyle>
                    ))}
                    {workspace.views.configuration?.styles?.relationships?.map(relationshipStyle => (
                        <RelationshipStyle key={""} style={relationshipStyle}>

                        </RelationshipStyle>
                    ))}
                </Styles>
                <Theme url={""} />
            </Views>
        </Workspace>
    )
}
