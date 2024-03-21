import { AutoLayoutDirection, IAutoLayout, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";

export class AutoLayout implements ISupportSnapshot<IAutoLayout> {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get direction(): AutoLayoutDirection { return this.propertiesMap.get("direction") as AutoLayoutDirection; }
    public set direction(value: AutoLayoutDirection) { this.propertiesMap.set("direction", value); }

    public get rankSeparation(): number { return this.propertiesMap.get("direction") as number; }
    public set rankSeparation(value: number) { this.propertiesMap.set("direction", value); }

    public get nodeSeparation(): number { return this.propertiesMap.get("direction") as number; }
    public set nodeSeparation(value: number) { this.propertiesMap.set("direction", value); }

    public fromSnapshot(autoLayout: IAutoLayout) {
        this.direction = autoLayout.direction;
        this.rankSeparation = autoLayout.rankSeparation;
        this.nodeSeparation = autoLayout.nodeSeparation;
    }

    public toSnapshot(): IAutoLayout {
        return Object.freeze({
            direction: this.direction,
            rankSeparation: this.rankSeparation,
            nodeSeparation: this.nodeSeparation
        });
    }
}