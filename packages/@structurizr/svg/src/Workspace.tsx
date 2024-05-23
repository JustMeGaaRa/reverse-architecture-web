import { FC, PropsWithChildren } from "react";

export const Workspace: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                position: "relative",
            }}
        >
            {children}
        </div>
    );
};
