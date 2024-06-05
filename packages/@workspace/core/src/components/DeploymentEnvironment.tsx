import { IDeploymentEnvironment } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { DeploymentEnvironmentContext } from "../contexts";

export const DeploymentEnvironment: FC<PropsWithChildren<{ deploymentEnvironment: IDeploymentEnvironment }>> = ({ children }) => {
    const [ deploymentEnvironment, setDeploymentEnvironment ] = useState<IDeploymentEnvironment>();

    return (
        <DeploymentEnvironmentContext.Provider value={{ deploymentEnvironment, setDeploymentEnvironment }}>
            {children}
        </DeploymentEnvironmentContext.Provider>
    )
}