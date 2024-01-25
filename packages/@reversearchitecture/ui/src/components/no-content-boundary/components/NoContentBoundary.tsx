import { FC, PropsWithChildren } from "react";

export const NoContentBoundary: FC<PropsWithChildren<{
    condition: boolean;
    fallback: React.ReactElement;
}>> = ({
    children,
    condition,
    fallback
}) => {
    // TODO: implement error boundary
    
    return (
        <>
            {condition ? fallback : children}
        </>
    )
}