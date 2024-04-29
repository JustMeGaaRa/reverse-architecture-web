import {
    All,
    IComponentView,
    Identifier,
    ISupportSnapshot,
    Position,
    ViewType
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Animation } from "./Animation";
import { AutoLayout } from "./AutoLayout";
import { ElementMetadata } from "./ElementMetadata";
import { Properties } from "./Properties";
import { RelationshipMetadata } from "./RelationshipMetadata";
import {
    createAnimationPropertiesMap,
    createAutoLayoutPropertiesMap,
    createElementMetadataPropertiesMap,
    createRelationshipMetadataPropertiesMap
} from "./utils";

export class ComponentView implements ISupportSnapshot<IComponentView> {
    private get includeArray(): Y.Array<string> { return this.propertiesMap.get("include") as Y.Array<string>; }
    private get excludeArray(): Y.Array<string> { return this.propertiesMap.get("exclude") as Y.Array<string>; }
    private get elementsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("elements") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get type(): ViewType.Component { return ViewType.Component; }

    public get containerIdentifier(): Identifier { return this.propertiesMap.get("containerIdentifier") as Identifier; }
    public set containerIdentifier(value: Identifier) { this.propertiesMap.set("containerIdentifier", value); }

    public get key(): string { return this.propertiesMap.get("key") as string; }
    public set key(value: string) { this.propertiesMap.set("key", value); }

    public get title(): string { return this.propertiesMap.get("title") as string; }
    public set title(value: string) { this.propertiesMap.set("title", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get include(): Array<Identifier | All> { return this.includeArray?.map(identifier => identifier) ?? []; }
    public get exclude(): Array<Identifier | All> { return this.excludeArray?.map(identifier => identifier) ?? []; }
    
    public get elements(): Array<ElementMetadata> { return this.elementsArray?.map(x => new ElementMetadata(x)) ?? []; }
    public get relationships(): Array<RelationshipMetadata> { return this.relationshipsArray?.map(x => new RelationshipMetadata(x)) ?? []; }

    public get autoLayout(): AutoLayout { return this.autoLayoutMap && new AutoLayout(this.autoLayoutMap); }
    public get animation(): Animation { return this.animationMap && new Animation(this.animationMap); }
    public get properties(): Properties { return new Properties(this.propertiesMap.get("properties") as Y.Map<unknown>); }

    public fromSnapshot(componentView: IComponentView) {
        this.containerIdentifier = componentView.containerIdentifier;
        this.key = componentView.key;
        this.title = componentView.title;
        this.description = componentView.description;

        if (!this.includeArray) {
            this.propertiesMap.set("include", new Y.Array<string>());
            this.includeArray.push(componentView.include ?? []);
        }
        
        if (!this.excludeArray) {
            this.propertiesMap.set("exclude", new Y.Array<string>());
            this.excludeArray.push(componentView.exclude ?? []);
        }

        componentView.elements?.forEach(element => this.addElement().fromSnapshot(element));
        componentView.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));

        if (componentView.autoLayout) {
            const autoLayoutMap = createAutoLayoutPropertiesMap();
            this.propertiesMap.set("autoLayout", autoLayoutMap);
            this.autoLayout.fromSnapshot(componentView.autoLayout);
        }

        if (componentView.animation) {
            const animationMap = createAnimationPropertiesMap();
            this.propertiesMap.set("animation", animationMap);
            this.animation.fromSnapshot(componentView.animation);
        }

        componentView.properties && this.properties.fromSnapshot(componentView.properties);
    }

    public toSnapshot(): IComponentView {
        return Object.freeze({
            type: this.type,
            containerIdentifier: this.containerIdentifier,
            key: this.key,
            title: this.title,
            description: this.description,
            include: this.include,
            exclude: this.exclude,
            elements: this.elements?.map(element => element.toSnapshot()) ?? [],
            relationships: this.relationships?.map(relationship => relationship.toSnapshot()) ?? [],
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation?.toSnapshot(),
            properties: this.properties.toSnapshot(),
        });
    }

    public addElement(): ElementMetadata {
        const elementMap = createElementMetadataPropertiesMap();
        this.elementsArray.push([elementMap]);
        return new ElementMetadata(elementMap);
    }

    public addRelationship(): RelationshipMetadata {
        const relationshipMap = createRelationshipMetadataPropertiesMap();
        this.relationshipsArray.push([relationshipMap]);
        return new RelationshipMetadata(relationshipMap);
    }

    public includeElement(identifier: Identifier, position?: Position) {
        // const group = this.model.addGroup();
        throw new Error("Method not implemented.");
    }
}
