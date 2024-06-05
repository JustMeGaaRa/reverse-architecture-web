import { ISoftwareSystem } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { SoftwareSystemContext } from "../contexts";

export const SoftwareSystem: FC<PropsWithChildren<{ softwareSystem: ISoftwareSystem }>> = ({ children }) => {
    const [ softwareSystem, setSoftwareSystem ] = useState<ISoftwareSystem>();

    return (
        <SoftwareSystemContext.Provider value={{ softwareSystem, setSoftwareSystem }}>
            {children}
        </SoftwareSystemContext.Provider>
    )
}