import { FC, PropsWithChildren } from "react";
import { Viewport, ViewportProvider } from "./components";

export const Views: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ViewportProvider>
            <Viewport>
                {children}
            </Viewport>
        </ViewportProvider>
    );
};
