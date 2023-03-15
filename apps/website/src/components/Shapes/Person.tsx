import { FC, PropsWithChildren } from "react";

export const Person: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}