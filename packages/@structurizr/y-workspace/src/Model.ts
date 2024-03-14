import { IModel, IObservable, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { DeploymentEnvironment } from "./DeploymentEnvironment";
import { Group } from "./Group";
import { Person } from "./Person";
import { Relationship } from "./Relationship";
import { SoftwareSystem } from "./SoftwareSystem";

export class Model implements ISupportSnapshot<IModel>, IObservable {
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
    }

    public toSnapshot(): IModel {
        return Object.freeze({
            people: this.people?.map(person => person.toSnapshot()),
            softwareSystems: this.softwareSystems?.map(softwareSystem => softwareSystem.toSnapshot()),
            deploymentEnvironments: this.deploymentEnvironments?.map(deploymentEnvironment => deploymentEnvironment.toSnapshot()),
            relationships: this.relationships?.map(relationship => relationship.toSnapshot()),
            groups: this.groups?.map(group => group.toSnapshot())
        })
    }

    public subscribe(observer: () => void): void {
        this.propertiesMap.observeDeep(observer);
    }

    public unsubscribe(observer: () => void): void {
        this.propertiesMap.unobserveDeep(observer);
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