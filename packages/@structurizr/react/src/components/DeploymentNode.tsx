import { IDeploymentNode } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { DeploymentNodeContext } from "../contexts";

export const DeploymentNode: FC<PropsWithChildren<{ deploymentNode: IDeploymentNode }>> = ({ children }) => {
    const [ deploymentNode, setDeploymentNode ] = useState<IDeploymentNode>();

    return (
        <DeploymentNodeContext.Provider value={{ deploymentNode, setDeploymentNode }}>
            {children}
        </DeploymentNodeContext.Provider>
    )
}