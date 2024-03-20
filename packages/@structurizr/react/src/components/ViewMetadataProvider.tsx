import { IViewDefinitionMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ViewMetadataContext } from "../contexts";

export const ViewMetadataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [metadata, setMetadata] = useState<IViewDefinitionMetadata>(null);

    return (
        <ViewMetadataContext.Provider value={{ metadata, setMetadata }}>
            {children}
        </ViewMetadataContext.Provider>
    );
}