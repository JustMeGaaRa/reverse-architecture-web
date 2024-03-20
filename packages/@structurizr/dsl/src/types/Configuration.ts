import { IConfiguration, IStyles, ISupportSnapshot } from "../interfaces";
import { Branding } from "./Branding";
import { Terminology } from "./Terminology";
import { Theme } from "./Theme";

export class Configuration implements ISupportSnapshot<IConfiguration> {
    constructor(params: Partial<IConfiguration>) {
        this.styles = params.styles ?? {
            elements: [],
            relationships: []
        };
        this.theme = params.theme;
        this.themes = params.themes ?? [];
        // this.branding = params.branding;
        // this.terminology = params.terminology;
    }

    public readonly styles: IStyles;
    public readonly theme?: Theme;
    public readonly themes: Theme[];
    public readonly branding?: Branding;
    public readonly terminology?: Terminology;

    public toSnapshot(): IConfiguration {
        return {
            styles: this.styles,
            theme: this.theme,
            themes: this.themes,
            // branding: this.branding,
            // terminology: this.terminology
        }
    }
}