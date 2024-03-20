import { ElementType, Identifier, IGroup, ISupportSnapshot, Tag } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { Component } from "./Component";
import { Container } from "./Container";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

export class Group implements ISupportSnapshot<IGroup> {
    private get peopleArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("people") as Y.Array<Y.Map<unknown>>; }
    private get softwareSystemsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("softwareSystems") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containers") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("components") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Group;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get people(): Array<Person> { return this.peopleArray.map(person => new Person(person)); }
    public get softwareSystems(): Array<SoftwareSystem> { return this.softwareSystemsArray.map(softwareSystem => new SoftwareSystem(softwareSystem)); }
    public get containers(): Array<Container> { return this.containersArray.map(container => new Container(container)); }
    public get components(): Array<Component> { return this.componentsArray.map(component => new Component(component)); }

    public fromSnapshot(group: IGroup) {
        this.identifier = group.identifier;
        this.name = group.name;
        this.tags = group.tags;
        group.people?.forEach(person => this.addPerson().fromSnapshot(person));
        group.softwareSystems?.forEach(softwareSystem => this.addSoftwareSystem().fromSnapshot(softwareSystem));
        group.containers?.forEach(container => this.addContainer().fromSnapshot(container));
        group.components?.forEach(component => this.addComponent().fromSnapshot(component));
    }

    public toSnapshot(): IGroup {
        return Object.freeze({
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            tags: this.tags ?? [],
            people: this.people?.map(person => person.toSnapshot()),
            softwareSystems: this.softwareSystems?.map(softwareSystem => softwareSystem.toSnapshot()),
            containers: this.containers?.map(container => container.toSnapshot()),
            components: this.components?.map(component => component.toSnapshot())
        });
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
}
