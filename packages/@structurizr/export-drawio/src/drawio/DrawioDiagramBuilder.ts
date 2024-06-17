import { MXCell, MxDiagram, MxObject } from "@justmegaara/mxgraph";
import { IBuilder } from "@structurizr/dsl";
import { v4 } from "uuid";

export class DrawioDiagramBuilder implements IBuilder<MxDiagram> {
    constructor(
        private name: string,
        private mxCells: Array<MXCell> = [],
        private mxObjects: Array<MxObject> = []
    ) { }

    build(): MxDiagram {
        return {
            _id: v4(),
            _name: this.name,
            mxGraphModel: {
                _grid: "1",
                _gridSize: "10",
                _guides: "1",
                _tooltips: "1",
                _connect: "1",
                _arrows: "1",
                _fold: "1",
                _page: "0",
                _pageScale: "1",
                _pageWidth: "1000",
                _pageHeight: "1000",
                _math: "0",
                _shadow: "0",
                root: {
                    mxCell: this.mxCells,
                    object: this.mxObjects
                }
            }
        };
    }

    addMxCells(mxCells: MXCell): void {
        this.mxCells.push(mxCells);
    }

    addMxObject(mxObject: any): void {
        this.mxObjects.push(mxObject);
    }
}