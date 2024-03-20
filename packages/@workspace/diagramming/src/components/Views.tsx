import { IViewDefinition, IViewDefinitionMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ViewMetadataContext } from "../contexts";
import { useViewRenderingEffect } from "../hooks";

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

export const ViewRenderingEffect: FC<{ view: IViewDefinition }> = ({ view }) => {
    useViewRenderingEffect(view);
    return null;
}