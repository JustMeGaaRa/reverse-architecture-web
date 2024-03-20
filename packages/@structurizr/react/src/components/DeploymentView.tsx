import { IDeploymentView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { DeploymentViewContext } from "../contexts";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const DeploymentView: FC<PropsWithChildren<{ view: IDeploymentView }>> = ({ children }) => {
    const [ deploymentView, setDeploymentView ] = useState<IDeploymentView>();

    return (
        <DeploymentViewContext.Provider value={{ deploymentView, setDeploymentView }}>
            <ViewMetadataProvider>
                {children}
            </ViewMetadataProvider>
        </DeploymentViewContext.Provider>
    )
}