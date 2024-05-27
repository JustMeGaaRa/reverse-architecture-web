import { FC, PropsWithChildren } from "react";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";

export const DeploymentView: FC<PropsWithChildren<{
    value: { key?: string; environment: string };
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
