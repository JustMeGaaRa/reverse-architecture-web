import {
    IElement,
    Position,
} from "@structurizr/dsl";
import { useCallback } from "react";

export const useWorkspace = () => {
    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        deleteElements
    }
}