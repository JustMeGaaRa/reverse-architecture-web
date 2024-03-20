import { ISupportVisitor } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ViewStrategyContext } from "../contexts";

export const ViewStrategyProvider: FC<PropsWithChildren<{ strategy: ISupportVisitor }>> = ({ children, strategy }) => {
    return (
        <ViewStrategyContext.Provider value={{ strategy }}>
            {children}
        </ViewStrategyContext.Provider>
    )
}