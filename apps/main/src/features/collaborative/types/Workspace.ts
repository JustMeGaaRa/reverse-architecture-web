import * as Y from "yjs";
import { v4 } from "uuid";
import { IComponent, IContainer, IDeploymentEnvironment, IGroup, IModel, IPerson, IProperties, IRelationship, ISoftwareSystem, ISupportSnapshot, IViews, IWorkspaceSnapshot } from "../interfaces";

export type WorkspaceStatus = "private" | "shared" | "archived";

export class WorkspaceInfo {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get workspaceId(): string { return this.propertiesMap.get("workspaceId") as string; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string | undefined { return this.propertiesMap.get("description") as string; }
    public get coverUrl(): string { return this.propertiesMap.get("coverUrl") as string; }
    public get status(): WorkspaceStatus { return this.propertiesMap.get("status") as WorkspaceStatus;}
    public get group(): string { return this.propertiesMap.get("group") as string; }
    public get createdBy(): string { return this.propertiesMap.get("createdBy") as string; }
    public get lastModifiedDate(): string { return this.propertiesMap.get("lastModifiedDate") as string; }
    public get lastModifiedBy(): string { return this.propertiesMap.get("lastModifiedBy") as string; }
    public get tags(): Array<string> { return this.propertiesMap.get("tags") as Array<string>; }
}

export class Workspace implements ISupportSnapshot<IWorkspaceSnapshot> {
    constructor(private readonly document: Y.Doc) {
        this.model = new Model(document.getMap("model"));
        this.views = new Views(document.getMap("views"));
        this.properties = new Properties(document.getMap("properties"));
    }

    public get version(): number { return this.properties.version; }
    public set version(value: number) { this.properties.version = value; }

    public get name(): string { return this.properties.name; }
    public set name(value: string) { this.properties.name = value; }

    public get description(): string | undefined { return this.properties.description; }
    public set description(value: string | undefined) { this.properties.description = value; }

    public get lastModifiedDate(): string { return this.properties.lastModifiedDate; }
    public set lastModifiedDate(value: string) { this.properties.lastModifiedDate = value; }

    public readonly model: Model;
    public readonly views: Views;
    public readonly properties: Properties;

    public fromSnapshot(workspace: IWorkspaceSnapshot) {
        this.version = 1;
        this.name = workspace.name;
        this.description = workspace.description;
        this.lastModifiedDate = workspace.lastModifiedDate;
        this.model.fromSnapshot(workspace.model);
        this.views.fromSnapshot(workspace.views);
    }

    public toSnapshot(): IWorkspaceSnapshot {
        return {
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate,
            properties: this.properties.toSnapshot(),
            model: this.model.toSnapshot(),
            views: this.views.toSnapshot()
        };
    }
}

export class Properties {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get version(): number { return this.propertiesMap.get("version") as number; }
    public set version(value: number) { this.propertiesMap.set("version", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get lastModifiedDate(): string { return this.propertiesMap.get("lastModifiedDate") as string; }
    public set lastModifiedDate(value: string) { this.propertiesMap.set("lastModifiedDate", value); }

    public toSnapshot(): IProperties {
        return {
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate
        };
    }
}

export class Model implements ISupportSnapshot<IModel> {
    private get peopleArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("people") as Y.Array<Y.Map<unknown>>;}
    private get softwareSystemsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("softwareSystems") as Y.Array<Y.Map<unknown>>; }
    private get deploymentEnvironmentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentEnvironments") as Y.Array<Y.Map<unknown>>; }
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get people(): Array<Person> { return this.peopleArray?.map(person => new Person(person)); }
    public get softwareSystems(): Array<SoftwareSystem> { return this.softwareSystemsArray?.map(softwareSystem => new SoftwareSystem(softwareSystem));  }
    public get deploymentEnvironments(): Array<DeploymentEnvironment> { return this.deploymentEnvironmentsArray?.map(deploymentEnvironment => new DeploymentEnvironment(deploymentEnvironment));  }
    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray?.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(model: IModel) {
        throw new Error("Method not implemented.");
    }

    public toSnapshot(): IModel {
        return {
            people: this.people?.map(person => person.toSnapshot()),
            softwareSystems: this.softwareSystems?.map(softwareSystem => softwareSystem.toSnapshot()),
            deploymentEnvironments: this.deploymentEnvironments?.map(deploymentEnvironment => deploymentEnvironment.toSnapshot()),
            relationships: this.relationships?.map(relationship => relationship.toSnapshot()),
            groups: this.groups?.map(group => group.toSnapshot())
        };
    }

    public addSoftwareSystem() {
        if (!this.propertiesMap.has("softwareSystems")) this.propertiesMap.set("softwareSystems", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const softwareSystemMap = new Y.Map([
            ["identifier", `softwareSystem-${uniqueId}`],
            ["name", "Software System"],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""],
            ["relationships", []],
            ["groups", new Y.Array<Y.Map<unknown>>()],
            ["containers", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.softwareSystemsArray.push([softwareSystemMap]);
        return new SoftwareSystem(softwareSystemMap);
    }

    public addPerson() {
        if (!this.propertiesMap.has("people")) this.propertiesMap.set("people", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const personMap = new Y.Map([
            ["identifier", `person-${uniqueId}`],
            ["name", "Person"],
            ["description", ""],
            ["tags", []],
            ["url", ""],
            ["relationships", []]
        ]);
        this.peopleArray.push([personMap]);
        return new Person(personMap);
    }

    public addDeploymentEnvironment() {
        if (!this.propertiesMap.has("deploymentEnvironments")) this.propertiesMap.set("deploymentEnvironments", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const deploymentEnvironmentMap = new Y.Map([
            ["identifier", `deploymentEnvironment-${uniqueId}`],
            ["name", "Deployment Environment"],
            ["description", ""],
            ["tags", []],
            ["url", ""],
            ["relationships", []]
        ]);
        this.deploymentEnvironmentsArray.push([deploymentEnvironmentMap]);
        return new DeploymentEnvironment(deploymentEnvironmentMap);
    }
    
    public addGroup() {
        if (!this.propertiesMap.has("groups")) this.propertiesMap.set("groups", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const groupMap = new Y.Map([
            ["identifier", `group-${uniqueId}`],
            ["name", "Group"],
            ["tags", []],
            ["people", new Y.Array<Y.Map<unknown>>()],
            ["softwareSystems", new Y.Array<Y.Map<unknown>>()],
            ["containers", new Y.Array<Y.Map<unknown>>()],
            ["components", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.groupsArray.push([groupMap]);
        return new Group(groupMap);
    }

    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}

export class Views implements ISupportSnapshot<IViews> {
    private get systemLandscapeArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemLandscapeViews") as Y.Array<Y.Map<unknown>>; }
    private get systemContextsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemContextViews") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerViews") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("componentViews") as Y.Array<Y.Map<unknown>>; }
    private get deploymentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentViews") as Y.Array<Y.Map<unknown>>; }
    private get configurationMap(): Y.Map<unknown> { return this.propertiesMap.get("configuration") as Y.Map<unknown>; }

    constructor(private readonly propertiesMap: Y.Map<unknown>) {
        if (!propertiesMap.has("systemLandscapeViews")) propertiesMap.set("systemLandscapeViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("systemContextViews")) propertiesMap.set("systemContextViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("containerViews")) propertiesMap.set("containerViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("componentViews")) propertiesMap.set("componentViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("deploymentViews")) propertiesMap.set("deploymentViews", new Y.Array<Y.Map<unknown>>());
    }

    public get systemLandscape(): Array<any> { return this.systemLandscapeArray?.map(view => new SystemLandscapeView(view)); }
    public get systemContexts(): Array<any> { return this.systemContextsArray?.map(view => new SystemContextView(view)); }
    public get containers(): Array<any> { return this.containersArray?.map(view => new ContainerView(view)); }
    public get components(): Array<any> { return this.componentsArray?.map(view => new ComponentView(view)); }
    public get deployments(): Array<any> { return this.deploymentsArray?.map(view => new DeploymentView(view)); }
    public get configuration(): Configuration { return new Configuration(this.configurationMap); }

    public fromSnapshot(views: IViews) {
        throw new Error("Method not implemented.");
    }

    public toSnapshot(): IViews {
        return {
            systemLandscape: this.systemLandscape?.map(view => view.toSnapshot()) ?? [],
            systemContexts: this.systemContexts?.map(view => view.toSnapshot()) ?? [],
            containers: this.containers?.map(view => view.toSnapshot()) ?? [],
            components: this.components?.map(view => view.toSnapshot()) ?? [],
            deployments: this.deployments?.map(view => view.toSnapshot()) ?? [],
            configuration: {
                styles: {
                    elements: [],
                    relationships: []
                },
                themes: []
            }
        };
    }
}

export enum ElementType {
    Group = "Group",
    Person = "Person",
    SoftwareSystem = "Software System",
    Container = "Container",
    Component = "Component",
    DeploymentNode = "Deployment Node",
    InfrastructureNode = "Infrastructure Node",
    ContainerInstance = "Container Instance",
    SoftwareSystemInstance = "Software System Instance"
}

export enum RelationshipType {
    Relationship = "Relationship",
}

export type Identifier = string;

export type All = "*";

export type Url = string;

export type Technology = string;

export class Tag {
    constructor(name: string) {
        this.name = name;
    }

    public readonly name!: string;

    static Element = new Tag("Element");
    static Group = new Tag("Group");
    static Person = new Tag("Person");
    static SoftwareSystem = new Tag("Software System");
    static Container = new Tag("Container");
    static Component = new Tag("Component");
    static DeploymentNode = new Tag("Deployment Node");
    static InfrastructureNode = new Tag("Infrastructure Node");
    static SoftwareSystemInstance = new Tag("Software System Instance");
    static ContainerInstance = new Tag("Container Instance");
    static Relationship = new Tag("Relationship");

    static from(text: string, separator: string = " "): Tag[] {
        return text?.split(separator)?.map(name => new Tag(name.trim())) ?? [];
    }
}

export class Person implements ISupportSnapshot<IPerson> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Person;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot() {
        return {
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            tags: this.tags?.map(tag => tag.name) ?? [],
            url: this.url,
        }
    }
        
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}

export class SoftwareSystem implements ISupportSnapshot<ISoftwareSystem> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containers") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.SoftwareSystem;
    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get containers(): Array<Container> { return this.containersArray?.map(container => new Container(container)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot() {
        return {
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags?.map(tag => tag.name) ?? [],
            url: this.url,
            containers: this.containers?.map(container => container.toSnapshot()),
        }
    }

    public addContainer() {
        if (!this.propertiesMap.has("containers")) this.propertiesMap.set("containers", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const containerMap = new Y.Map([
            ["identifier", `container-${uniqueId}`],
            ["name", "Container"],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""],
            ["relationships", []],
            ["components", new Y.Array<Y.Map<unknown>>()],
            ["groups", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.containersArray.push([containerMap]);
        return new Container(containerMap);
    }
    
    public addGroup() {
        if (!this.propertiesMap.has("groups")) this.propertiesMap.set("groups", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const groupMap = new Y.Map([
            ["identifier", `group-${uniqueId}`],
            ["name", "Group"],
            ["tags", []],
            ["people", new Y.Array<Y.Map<unknown>>()],
            ["softwareSystems", new Y.Array<Y.Map<unknown>>()],
            ["containers", new Y.Array<Y.Map<unknown>>()],
            ["components", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.groupsArray.push([groupMap]);
        return new Group(groupMap);
    }
    
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}

export class Container implements ISupportSnapshot<IContainer> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("components") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Container;
    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get components(): Array<Component> { return this.componentsArray?.map(component => new Component(component)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IContainer {
        return {
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags?.map(tag => tag.name) ?? [],
            url: this.url,
            components: this.components?.map(component => component.toSnapshot()),
        }
    }

    public addComponent() {
        if (!this.propertiesMap.has("components")) this.propertiesMap.set("components", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const componentMap = new Y.Map([
            ["identifier", `component-${uniqueId}`],
            ["name", "Component"],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""],
            ["relationships", []]
        ]);
        this.componentsArray.push([componentMap]);
        return new Component(componentMap);
    }
    
    public addGroup() {
        if (!this.propertiesMap.has("groups")) this.propertiesMap.set("groups", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const groupMap = new Y.Map([
            ["identifier", `group-${uniqueId}`],
            ["name", "Group"],
            ["tags", []],
            ["people", new Y.Array<Y.Map<unknown>>()],
            ["softwareSystems", new Y.Array<Y.Map<unknown>>()],
            ["containers", new Y.Array<Y.Map<unknown>>()],
            ["components", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.groupsArray.push([groupMap]);
        return new Group(groupMap);
    }
    
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}

export class Component implements ISupportSnapshot<IComponent> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Component;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IComponent {
        return {
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags?.map(tag => tag.name) ?? [],
            url: this.url,
        }
    }
    
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}

export class DeploymentEnvironment implements ISupportSnapshot<IDeploymentEnvironment> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }
    
    public readonly type: ElementType.DeploymentNode;

    public toSnapshot(): IDeploymentEnvironment {
        return {
            type: this.type,
        }
    }
}

export class Relationship implements ISupportSnapshot<IRelationship> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: RelationshipType.Relationship;
    public get sourceIdentifier(): Identifier { return this.propertiesMap.get("sourceIdentifier") as Identifier; }
    public get targetIdentifier(): Identifier { return this.propertiesMap.get("targetIdentifier") as Identifier; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }

    public toSnapshot(): IRelationship {
        return Object.freeze({
            type: this.type,
            sourceIdentifier: this.sourceIdentifier,
            targetIdentifier: this.targetIdentifier,
            description: this.description,
            technology: this.technology,
            tags: this.tags?.map(tag => tag.name) ?? [],
            url: this.url,
        })
    }
}

export class Group implements ISupportSnapshot<IGroup> {
    private get peopleArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("people") as Y.Array<Y.Map<unknown>>; }
    private get softwareSystemsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("softwareSystems") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containers") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("components") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Group;
    public get people(): Array<Person> { return this.peopleArray.map(person => new Person(person)); }
    public get softwareSystems(): Array<SoftwareSystem> { return this.softwareSystemsArray.map(softwareSystem => new SoftwareSystem(softwareSystem)); }
    public get containers(): Array<Container> { return this.containersArray.map(container => new Container(container)); }
    public get components(): Array<Component> { return this.componentsArray.map(component => new Component(component)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }

    public toSnapshot(): IGroup {
        return {
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            tags: this.tags?.map(tag => tag.name) ?? [],
            people: this.people?.map(person => person.toSnapshot()),
            softwareSystems: this.softwareSystems?.map(softwareSystem => softwareSystem.toSnapshot()),
            containers: this.containers?.map(container => container.toSnapshot()),
            components: this.components?.map(component => component.toSnapshot())
        }
    }
}

export class SystemLandscapeView {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class SystemContextView {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class ContainerView {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class ComponentView {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class DeploymentView {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class Configuration {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }

    public get styles(): Styles { return new Styles(this.propertiesMap.get("styles") as Y.Map<unknown>); }
}

export class Styles {
    private get elementsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("elements") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }

    public get elements(): Array<ElementStyle> { return this.elementsArray.map(element => new ElementStyle(element)); }
    public get relationships(): Array<RelationshipStyle> { return this.relationshipsArray.map(relationship => new RelationshipStyle(relationship)); }
}

export class ElementStyle {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class RelationshipStyle {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class Theme {
    public constructor(
        private readonly propertiesMap: Y.Map<unknown>,
    ) { }
}

export class CommentCollection {
    constructor(
        private readonly document: Y.Doc
    ) {
        this.comments = document.getArray("comments");
    }

    public readonly comments: Y.Array<Comment>;
}

export class Structurizr {
    constructor(
        private readonly document: Y.Doc
    ) {
        this.structurizr = document.getText("structurizr");
    }

    public readonly structurizr: Y.Text;
}