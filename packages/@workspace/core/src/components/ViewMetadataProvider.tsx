import { IViewDefinitionMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ViewMetadataContext } from "../contexts";

export const ViewMetadataProvider: FC<PropsWithChildren<{ metadata: IViewDefinitionMetadata }>> = ({ children, metadata }) => {
    // const [metadata, setMetadata] = useState<IViewDefinitionMetadata>(null);

    return (
        <ViewMetadataContext.Provider value={{ metadata }}>
            {children}
        </ViewMetadataContext.Provider>
    );
}