import { IInfrastructureNode } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { InfrastructureNodeContext } from "../contexts";

export const InfrastructureNode: FC<PropsWithChildren<{ infrastructureNode: IInfrastructureNode }>> = ({ children }) => {
    const [ infrastructureNode, setInfrastructureNode ] = useState<IInfrastructureNode>();

    return (
        <InfrastructureNodeContext.Provider value={{ infrastructureNode, setInfrastructureNode }}>
            {children}
        </InfrastructureNodeContext.Provider>
    )
}