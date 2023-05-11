import { AutoLayoutDirection } from "./AutoLayoutDirection";

export class AutoLayout {
    constructor() {
        this.direction = AutoLayoutDirection.TopBotom;
        this.rankSeparation = 300;
        this.nodeSeparation = 300;
    }

    public readonly direction: AutoLayoutDirection;
    public readonly rankSeparation: number;
    public readonly nodeSeparation: number;
}