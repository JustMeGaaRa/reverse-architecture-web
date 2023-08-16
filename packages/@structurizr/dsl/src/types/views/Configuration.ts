import {
    Branding,
    ISupportImmutable,
    Styles,
    Terminology
} from "../..";

export interface IConfiguration {
    styles: Styles;
    theme?: string;
    themes: string[];
    branding?: Branding;
    terminology?: Terminology;
}

export class Configuration implements ISupportImmutable<IConfiguration> {
    constructor(params: Partial<IConfiguration>) {
        this.styles = params.styles ?? {
            elements: [],
            relationships: []
        };
        this.theme = params.theme;
        this.themes = params.themes ?? [];
        this.branding = params.branding;
        this.terminology = params.terminology;
    }

    public readonly styles: Styles;
    public readonly theme?: string;
    public readonly themes: string[];
    public readonly branding?: Branding;
    public readonly terminology?: Terminology;

    public toObject(): IConfiguration {
        return {
            styles: this.styles,
            theme: this.theme,
            themes: this.themes,
            branding: this.branding,
            terminology: this.terminology
        }
    }
}