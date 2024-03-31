import { IModel, IModelMetadata, ModelViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ModelContext } from "../contexts";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ElementVariantProvider } from "./ElementVariantProvider";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const Model: FC<PropsWithChildren<{ model: IModel }>> = ({ children, model }) => {
    const [ metadata, setMetadata ] = useState<IModelMetadata>();
    const { workspace } = useWorkspace();
    const { renderModel } = useViewRenderer();
    
    useEffect(() => {
        const strategy = new ModelViewStrategy(model);
        return renderModel(workspace, strategy);
    }, [workspace, model, renderModel]);

    return (
        <ModelContext.Provider value={{ model, metadata, setMetadata }}>
            <ViewMetadataProvider metadata={undefined}>
                <ElementVariantProvider initialVariant={"model"}>
                    {children}
                </ElementVariantProvider>
            </ViewMetadataProvider>
        </ModelContext.Provider>
    )
}