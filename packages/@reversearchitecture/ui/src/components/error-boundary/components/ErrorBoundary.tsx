import { FC, PropsWithChildren } from "react";

export const ErrorBoundary: FC<PropsWithChildren<{
    fallback: React.ReactElement;
}>> = ({
    children,
    fallback
}) => {
    // TODO: implement error boundary
    
    return (
        <>
            {children}
        </>
    )
}