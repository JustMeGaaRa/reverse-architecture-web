import { All, Identifier, IElement, IElementPosition, IRelationshipPosition, ISupportSnapshot, ISystemLandscapeView, Position, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";
import { AutoLayout } from "./AutoLayout";
import { Animation } from "./Animation";
import { Properties } from "./Properties";
import { createAnimationPropertiesMap, createAutoLayoutPropertiesMap } from "./utils";
import { Model } from "./Model";

export class SystemLandscapeView implements ISupportSnapshot<ISystemLandscapeView> {
    private get includeArray(): Y.Array<string> { return this.propertiesMap.get("include") as Y.Array<string>; }
    private get excludeArray(): Y.Array<string> { return this.propertiesMap.get("exclude") as Y.Array<string>; }
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    constructor(
        private readonly propertiesMap: Y.Map<unknown>,
        private readonly model: Model
    ) { }

    public get type(): ViewType { return ViewType.SystemLandscape; }

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }
    
    public get key(): string { return this.propertiesMap.get("key") as string; }
    public set key(value: string) { this.propertiesMap.set("key", value); }

    public get title(): string { return this.propertiesMap.get("title") as string; }
    public set title(value: string) { this.propertiesMap.set("title", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get include(): Array<Identifier | All> { return this.includeArray?.map(identifier => identifier) ?? []; }
    public get exclude(): Array<Identifier | All> { return this.excludeArray?.map(identifier => identifier) ?? []; }
    
    public get elements(): Array<IElementPosition> { return this.propertiesMap.get("elements") as Array<IElementPosition>; }
    public set elements(value: Array<IElementPosition>) { this.propertiesMap.set("elements", value); }
    
    public get relationships(): Array<IRelationshipPosition> { return this.propertiesMap.get("relationships") as Array<IRelationshipPosition>; }
    public set relationships(value: Array<IRelationshipPosition>) { this.propertiesMap.set("relationships", value); }

    public get autoLayout(): AutoLayout { return this.autoLayoutMap && new AutoLayout(this.autoLayoutMap); }
    public get animation(): Animation { return this.animationMap && new Animation(this.animationMap); }
    public get properties(): Properties { return new Properties(this.propertiesMap.get("properties") as Y.Map<unknown>); }

    public fromSnapshot(systemLandscapeView: ISystemLandscapeView) {
        this.identifier = systemLandscapeView.identifier;
        this.key = systemLandscapeView.key;
        this.title = systemLandscapeView.title;
        this.description = systemLandscapeView.description;
        this.includeArray.push(systemLandscapeView.include ?? []);
        this.excludeArray.push(systemLandscapeView.exclude ?? []);

        // systemLandscapeView.elements?.forEach(element => this.addElement().fromSnapshot(element));
        // systemLandscapeView.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));

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
            identifier: this.identifier,
            key: this.key,
            title: this.title,
            description: this.description,
            include: this.include,
            exclude: this.exclude,
            elements: this.elements,
            relationships: this.relationships,
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation?.toSnapshot(),
            properties: this.properties.toSnapshot(),
        });
    }

    public includeElement(identifier: Identifier, position?: Position) {
        // const group = this.model.addGroup();
        throw new Error("Method not implemented.");
    }
}