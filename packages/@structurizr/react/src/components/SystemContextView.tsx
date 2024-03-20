import { ISystemContextView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { SystemContextViewContext } from "../contexts";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const SystemContextView: FC<PropsWithChildren<{ view: ISystemContextView }>> = ({ children }) => {
    const [ systemContextView, setSystemContextView ] = useState<ISystemContextView>();

    return (
        <SystemContextViewContext.Provider value={{ systemContextView, setSystemContextView }}>
            <ViewMetadataProvider>
                {children}
            </ViewMetadataProvider>
        </SystemContextViewContext.Provider>
    )
}