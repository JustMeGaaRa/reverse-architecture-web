import { useEffect } from "react";
import { useWorkspaceCollection } from "./useWorkspaceCollection";

export const useOnWorkspaceSelected = (callback: (indicies: string[]) => void) => {
    const { selectedIndicies } = useWorkspaceCollection();
    useEffect(() => callback?.(selectedIndicies), [selectedIndicies, callback]);
}