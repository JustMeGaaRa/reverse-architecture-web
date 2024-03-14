import { ElementType, Identifier, IGroup, ISupportSnapshot, Tag } from "@structurizr/dsl";
import * as Y from "yjs";
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
    public get people(): Array<Person> { return this.peopleArray.map(person => new Person(person)); }
    public get softwareSystems(): Array<SoftwareSystem> { return this.softwareSystemsArray.map(softwareSystem => new SoftwareSystem(softwareSystem)); }
    public get containers(): Array<Container> { return this.containersArray.map(container => new Container(container)); }
    public get components(): Array<Component> { return this.componentsArray.map(component => new Component(component)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }

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
}
