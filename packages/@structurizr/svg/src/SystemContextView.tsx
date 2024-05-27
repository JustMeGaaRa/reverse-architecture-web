import { FC, PropsWithChildren } from "react";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";

export const SystemContextView: FC<PropsWithChildren<{
    value?: { key?: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    return (
        <ViewMetadataProvider metadata={metadata}>
            {children}
        </ViewMetadataProvider>
    );
};
