import { All, Identifier, IElementPosition, IRelationshipPosition, ISupportSnapshot, ISystemLandscapeView, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";
import { AutoLayout } from "./AutoLayout";
import { Animation } from "./Animation";
import { Properties } from "./Properties";

export class SystemLandscapeView implements ISupportSnapshot<ISystemLandscapeView> {
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.SystemLandscape;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }
    
    public get key(): string { return this.propertiesMap.get("key") as string; }
    public set key(value: string) { this.propertiesMap.set("key", value); }

    public get title(): string { return this.propertiesMap.get("title") as string; }
    public set title(value: string) { this.propertiesMap.set("title", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get include(): Array<Identifier | All> { return this.propertiesMap.get("include") as Array<Identifier | All>; }
    public set include(value: Array<Identifier | All>) { this.propertiesMap.set("include", value); }

    public get exclude(): Array<Identifier> { return this.propertiesMap.get("exclude") as Array<Identifier>; }
    public set exclude(value: Array<Identifier>) { this.propertiesMap.set("exclude", value); }
    
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
        this.description = systemLandscapeView.description;
        this.include = systemLandscapeView.include;
        this.exclude = systemLandscapeView.exclude;
        this.title = systemLandscapeView.title;
        this.elements = systemLandscapeView.elements;
        this.relationships = systemLandscapeView.relationships;
        systemLandscapeView.autoLayout && this.autoLayout.fromSnapshot(systemLandscapeView.autoLayout);
        systemLandscapeView.animation && this.animation.fromSnapshot(systemLandscapeView.animation);
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
}