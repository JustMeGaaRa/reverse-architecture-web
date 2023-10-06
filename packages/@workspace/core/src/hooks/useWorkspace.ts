import {
    IElement,
    Position,
} from "@structurizr/dsl";
import { useCallback } from "react";

export const useWorkspace = () => {
    const addElements = useCallback((element: IElement, position: Position, parentId?: string) => {

    }, []);

    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        addElements,
        deleteElements
    }
}