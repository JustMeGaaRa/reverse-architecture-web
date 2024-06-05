import { ISoftwareSystemInstance } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { SoftwareSystemInstanceContext } from "../contexts";

export const SoftwareSystemInstance: FC<PropsWithChildren<{ softwareSystemInstance: ISoftwareSystemInstance }>> = ({ children }) => {
    const [ softwareSystemInstance, setSoftwareSystemInstance ] = useState<ISoftwareSystemInstance>();

    return (
        <SoftwareSystemInstanceContext.Provider value={{ softwareSystemInstance, setSoftwareSystemInstance }}>
            {children}
        </SoftwareSystemInstanceContext.Provider>
    )
}