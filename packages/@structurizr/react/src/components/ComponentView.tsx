import { IComponentView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ComponentViewContext } from "../contexts";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const ComponentView: FC<PropsWithChildren<{ view: IComponentView }>> = ({ children }) => {
    const [ componentView, setComponentView ] = useState<IComponentView>();

    return (
        <ComponentViewContext.Provider value={{ componentView, setComponentView }}>
            <ViewMetadataProvider>
                {children}
            </ViewMetadataProvider>
        </ComponentViewContext.Provider>
    )
}