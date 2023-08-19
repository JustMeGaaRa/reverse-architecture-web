import { ISupportImmutable } from "../../metadata/IViewMetadata";
import { AutoLayoutDirection } from "./AutoLayoutDirection";

export interface IAutoLayout {
    direction: AutoLayoutDirection;
    rankSeparation: number;
    nodeSeparation: number;
}

export class AutoLayout implements ISupportImmutable<IAutoLayout> {
    constructor(values?: IAutoLayout) {
        this.direction = values?.direction ?? AutoLayoutDirection.TopBotom;
        this.rankSeparation = values?.rankSeparation ?? 300;
        this.nodeSeparation = values?.nodeSeparation ?? 300;
    }

    public readonly direction: AutoLayoutDirection;
    public readonly rankSeparation: number;
    public readonly nodeSeparation: number;

    public toObject(): IAutoLayout {
        return {
            direction: this.direction,
            rankSeparation: this.rankSeparation,
            nodeSeparation: this.nodeSeparation
        };
    }
}