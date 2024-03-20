import { IConfiguration, ISupportSnapshot, Theme } from "@structurizr/dsl";
import * as Y from "yjs";
import { Styles } from "./Styles";

export class Configuration implements ISupportSnapshot<IConfiguration> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) {
        if (!propertiesMap.has("styles")) propertiesMap.set("styles", new Y.Map<unknown>());
        if (!propertiesMap.has("themes")) propertiesMap.set("themes", []);
    }

    public get styles(): Styles { return new Styles(this.propertiesMap.get("styles") as Y.Map<unknown>); }
    public get themes(): Array<Theme> { return this.propertiesMap.get("themes") as Array<Theme>; }

    public fromSnapshot(configuration: IConfiguration) {
        this.styles.fromSnapshot(configuration.styles);
        this.propertiesMap.set("themes", configuration.themes);
    }

    public toSnapshot(): IConfiguration {
        return Object.freeze({
            styles: this.styles.toSnapshot(),
            themes: this.themes
        });
    }
}
