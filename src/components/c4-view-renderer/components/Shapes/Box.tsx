import { FC, PropsWithChildren } from "react";

export const DefaultBox: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}