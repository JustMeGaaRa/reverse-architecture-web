import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceCollectionContext } from "../contexts";

export const WorkspaceCollectionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selectedIndicies, setSelectedIndicies ] = useState<string[]>([]);
    const [ isSelectionModeOn, setIsSelectionModeOn ] = useState(false);

    return (
        <WorkspaceCollectionContext.Provider
            value={{
                isSelectionModeOn,
                selectedIndicies,
                setIsSelectionModeOn,
                setSelectedIndicies
            }}
        >
            {children}
        </WorkspaceCollectionContext.Provider>
    )
}