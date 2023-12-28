import { useCallback } from "react"

export const useUndoRedo = () => {
    const undo = useCallback(() => {

    }, []);

    const redo = useCallback(() => {

    }, []);

    return {
        undo,
        redo
    }
}