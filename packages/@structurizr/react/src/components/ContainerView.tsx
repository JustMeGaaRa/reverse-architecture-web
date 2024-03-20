import { IContainerView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ContainerViewContext } from "../contexts";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const ContainerView: FC<PropsWithChildren<{ view: IContainerView }>> = ({ children }) => {
    const [ containerView, setContainerView ] = useState<IContainerView>();

    return (
        <ContainerViewContext.Provider value={{ containerView, setContainerView }}>
            <ViewMetadataProvider>
                {children}
            </ViewMetadataProvider>
        </ContainerViewContext.Provider>
    )
}