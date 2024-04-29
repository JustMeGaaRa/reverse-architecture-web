import {
    All,
    Identifier,
    ISupportSnapshot,
    ISystemLandscapeView,
    Position,
    ViewType
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Animation } from "./Animation";
import { AutoLayout } from "./AutoLayout";
import { ElementMetadata } from "./ElementMetadata";
import { Model } from "./Model";
import { Properties } from "./Properties";
import { RelationshipMetadata } from "./RelationshipMetadata";
import {
    createAnimationPropertiesMap,
    createAutoLayoutPropertiesMap,
    createElementMetadataPropertiesMap,
    createRelationshipMetadataPropertiesMap
} from "./utils";

export class SystemLandscapeView implements ISupportSnapshot<ISystemLandscapeView> {
    private get includeArray(): Y.Array<string> { return this.propertiesMap.get("include") as Y.Array<string>; }
    private get excludeArray(): Y.Array<string> { return this.propertiesMap.get("exclude") as Y.Array<string>; }
    private get elementsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("elements") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    constructor(
        private readonly propertiesMap: Y.Map<unknown>,
        private readonly model: Model
    ) { }

    public get type(): ViewType.SystemLandscape { return ViewType.SystemLandscape; }
    
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

    public fromSnapshot(systemLandscapeView: ISystemLandscapeView) {
        this.key = systemLandscapeView.key;
        this.title = systemLandscapeView.title;
        this.description = systemLandscapeView.description;

        if (!this.includeArray) {
            this.propertiesMap.set("include", new Y.Array<string>());
            this.includeArray.push(systemLandscapeView.include ?? []);
        }

        if (!this.excludeArray) {
            this.propertiesMap.set("exclude", new Y.Array<string>());
            this.excludeArray.push(systemLandscapeView.exclude ?? []);
        }

        systemLandscapeView.elements?.forEach(element => this.addElement().fromSnapshot(element));
        systemLandscapeView.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));

        if (systemLandscapeView.autoLayout) {
            const autoLayoutMap = createAutoLayoutPropertiesMap();
            this.propertiesMap.set("autoLayout", autoLayoutMap);
            this.autoLayout.fromSnapshot(systemLandscapeView.autoLayout);
        }

        if (systemLandscapeView.animation) {
            const animationMap = createAnimationPropertiesMap();
            this.propertiesMap.set("animation", animationMap);
            this.animation.fromSnapshot(systemLandscapeView.animation);
        }
        
        systemLandscapeView.properties && this.properties.fromSnapshot(systemLandscapeView.properties);
    }

    public toSnapshot(): ISystemLandscapeView {
        return Object.freeze({
            type: this.type,
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