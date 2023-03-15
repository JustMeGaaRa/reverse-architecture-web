import { AutoLayoutDirection } from "./AutoLayoutDirection";


export class AutoLayout {
    constructor() {
        this.direction = AutoLayoutDirection.TopBotom;
        this.rankSeparation = 300;
        this.nodeSeparation = 300;
    }

    direction: AutoLayoutDirection;
    rankSeparation: number;
    nodeSeparation: number;
}
