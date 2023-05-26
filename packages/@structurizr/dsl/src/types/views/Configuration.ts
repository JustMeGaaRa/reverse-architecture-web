import { Terminology } from "../model/Terminology";
import { Branding } from "../views/Branding";
import { Styles } from "../views/Style";

export class Configuration {
    constructor(
        params: Partial<Configuration>
    ) {
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
}