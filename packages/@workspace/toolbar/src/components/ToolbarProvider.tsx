import { FC, PropsWithChildren, useState } from "react";
import { ToolbarContext } from "../context";

export const ToolbarProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ toolbarNode, setToolbarNode ] = useState(null);

    return (
        <ToolbarContext.Provider value={{ toolbarNode, setToolbarNode }}>
            {children}
        </ToolbarContext.Provider>
    )
}