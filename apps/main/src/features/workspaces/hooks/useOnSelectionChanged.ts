import { useEffect } from "react";
import { useSelectionContainer } from "./useSelectionContainer";

export const useOnSelectionChanged = (callback: (indicies: string[]) => void) => {
    const { selectedIndicies } = useSelectionContainer();
    useEffect(() => callback?.(selectedIndicies), [selectedIndicies, callback]);
}