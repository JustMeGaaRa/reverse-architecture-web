import { ISystemLandscapeView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { SystemLandscapeViewContext } from "../contexts";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const SystemLandscapeView: FC<PropsWithChildren<{ view: ISystemLandscapeView }>> = ({ children }) => {
    const [ systemLandscapeView, setSystemLandscapeView ] = useState<ISystemLandscapeView>();

    return (
        <SystemLandscapeViewContext.Provider value={{ systemLandscapeView, setSystemLandscapeView }}>
            <ViewMetadataProvider>
                {children}
            </ViewMetadataProvider>
        </SystemLandscapeViewContext.Provider>
    )
}