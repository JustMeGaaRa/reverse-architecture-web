import { IElement, Tag } from "@structurizr/dsl";

export const formatElementTag = (data: IElement) => {
    if (data?.tags === undefined || data?.tags?.length === 0)
        return Tag.Element.name;

    if (data.tags.some(x => x.name === Tag.SoftwareSystem.name))
        return Tag.SoftwareSystem.name;

    if (data.tags.some(x => x.name === Tag.Container.name))
        return Tag.Container.name;

    if (data.tags.some(x => x.name === Tag.Component.name))
        return Tag.Component.name;

    if (data.tags.some(x => x.name === Tag.Person.name))
        return Tag.Person.name;

    if (data.tags.some(x => x.name === Tag.DeploymentNode.name))
        return Tag.DeploymentNode.name;

    if (data.tags.some(x => x.name === Tag.InfrastructureNode.name))
        return Tag.InfrastructureNode.name;

    if (data.tags.some(x => x.name === Tag.ContainerInstance.name))
        return Tag.ContainerInstance.name;

    if (data.tags.some(x => x.name === Tag.SoftwareSystemInstance.name))
        return Tag.SoftwareSystemInstance.name;

    if (data.tags.some(x => x.name === Tag.Group.name))
        return Tag.Group.name;

    throw new Error("Element has no valid tag");
};