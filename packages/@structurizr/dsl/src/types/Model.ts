import {
    Container,
    DeploymentEnvironment,
    Group,
    Identifier,
    IDeploymentEnvironment,
    IGroup,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISupportImmutable,
    Person,
    Relationship,
    SoftwareSystem
} from "../";

export interface IModel {
    people: IPerson[];
    softwareSystems: ISoftwareSystem[];
    deploymentEnvironments: IDeploymentEnvironment[];
    relationships: IRelationship[];
    groups: IGroup[];
}

export class Model implements ISupportImmutable<IModel> {
    constructor(params: IModel) {
        this.people = params.people ? params.people.map(p => new Person(p)) : [];
        this.softwareSystems = params.softwareSystems ? params.softwareSystems.map(s => new SoftwareSystem(s)) : [];
        this.deploymentEnvironments = params.deploymentEnvironments ? params.deploymentEnvironments.map(d => new DeploymentEnvironment(d)) : [];
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.groups = params.groups ? params.groups.map(g => new Group(g)) : [];
    }

    public readonly people: Person[];
    public readonly softwareSystems: SoftwareSystem[];
    public readonly deploymentEnvironments: DeploymentEnvironment[];
    public readonly relationships: Relationship[];
    public readonly groups: Group[];

    public toObject(): IModel {
        return {
            people: this.people.map(p => p.toObject()),
            softwareSystems: this.softwareSystems.map(s => s.toObject()),
            deploymentEnvironments: this.deploymentEnvironments.map(d => d.toObject()),
            relationships: this.relationships.map(r => r.toObject()),
            groups: this.groups.map(g => g.toObject())
        }
    }

    public addGroup(group: Group) {
        this.groups.push(group);
    }

    public addPerson(person: Person, groupId?: Identifier) {
        if (groupId) {
            this.groups.find(g => g.identifier === groupId)?.addPerson(person);
        }
        else {
            this.people.push(person);
        }
    }

    public addSoftwareSystem(softwareSystem: SoftwareSystem, groupId?: Identifier) {
        if (groupId) {
            this.groups.find(g => g.identifier === groupId)?.addSoftwareSystem(softwareSystem);
        }
        else {
            this.softwareSystems.push(softwareSystem);
        }
    }

    public addRelationship(relationship: Relationship) {
        this.relationships.push(relationship);
    }

    public findSoftwareSystem(identifier: Identifier): SoftwareSystem | undefined {
        return this.softwareSystems
            .concat(this.groups.flatMap(x => x.softwareSystems))
            .find(x => x.identifier === identifier);
    }

    public findContainer(identifier: Identifier): Container | undefined {
        const groupContainers = this.groups
            .flatMap(x => x.softwareSystems)
            .flatMap(x => x.containers);
        const softwareSystemContainers = this.softwareSystems
            .flatMap(x => x.containers);
        return softwareSystemContainers
            .concat(groupContainers)
            .find(x => x.identifier === identifier);
    }

    public findContainerParent(containerId: Identifier): SoftwareSystem | undefined {
        return this.softwareSystems
            .concat(this.groups.flatMap(x => x.softwareSystems))
            .find(x => x.containers.some(c => c.identifier === containerId));
    }

    public findComponentParent(componentId: Identifier): Container | undefined {
        const groupContainers = this.groups
            .flatMap(x => x.softwareSystems)
            .flatMap(x => x.containers);
        const softwareSystemContainers = this.softwareSystems
            .flatMap(x => x.containers);
        return softwareSystemContainers
            .concat(groupContainers)
            .find(x => x.components.some(c => c.identifier === componentId));
    }
}