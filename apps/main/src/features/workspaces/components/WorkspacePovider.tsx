import { FC, PropsWithChildren, useState } from "react";
import { TableContext } from "../contexts";
import { ItemData } from "../types";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ data, setData ] = useState<ItemData[]>([]);

    return (
        <TableContext.Provider value={{ data, setData }}>
            {children}
        </TableContext.Provider>
    )
}