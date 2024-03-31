import { IViews } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ViewsContext } from "../contexts";
import { ElementVariantProvider } from "./ElementVariantProvider";

export const Views: FC<PropsWithChildren<{ views?: IViews }>> = ({ children, views }) => {
    return (
        <ViewsContext.Provider value={{ views }}>
            <ElementVariantProvider initialVariant={"view"}>
                {children}
            </ElementVariantProvider>
        </ViewsContext.Provider>
    )
}