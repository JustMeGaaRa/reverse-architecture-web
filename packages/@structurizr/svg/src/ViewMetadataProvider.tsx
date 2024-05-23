import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
} from "react";

export interface IElementMetadata {
    x: number;
    y: number;
    height?: number;
    width?: number;
}

export type IRelationshipMetadata = Array<{ x: number; y: number }>;

export interface IViewMetadata {
    elements: Record<string, IElementMetadata>;
    relationships: Record<string, IRelationshipMetadata>;
}

const ViewMetadataContext = createContext<{
    metadata?: IViewMetadata;
}>({
    metadata: {
        elements: {},
        relationships: {},
    },
});

export const ViewMetadataProvider: FC<PropsWithChildren<{
    metadata?: IViewMetadata;
}>> = ({
    children,
    metadata
}) => {
    return (
        <ViewMetadataContext.Provider value={{ metadata }}>
            {children}
        </ViewMetadataContext.Provider>
    );
};

export const useViewMetadata = () => {
    return useContext(ViewMetadataContext);
};
