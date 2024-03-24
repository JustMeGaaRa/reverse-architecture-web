import { IViewDefinitionMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ViewMetadataContext } from "../contexts";

export const Views: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export const ViewMetadataProvider: FC<PropsWithChildren<{ metadata: IViewDefinitionMetadata }>> = ({ children, metadata }) => {
    return (
        <ViewMetadataContext.Provider value={{ metadata }}>
            {children}
        </ViewMetadataContext.Provider>
    );
}