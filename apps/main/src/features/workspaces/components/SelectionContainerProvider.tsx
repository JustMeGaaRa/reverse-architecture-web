import { FC, PropsWithChildren, useState } from "react";
import { SelectionContainerContext } from "../contexts";

export const SelectionContainerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selectedIndicies, setSelectedIndicies ] = useState<number[]>([]);
    const [ isSelectionModeOn, setIsSelectionModeOn ] = useState(false);

    return (
        <SelectionContainerContext.Provider
            value={{
                isSelectionModeOn,
                selectedIndicies,
                setIsSelectionModeOn,
                setSelectedIndicies
            }}
        >
            {children}
        </SelectionContainerContext.Provider>
    )
}