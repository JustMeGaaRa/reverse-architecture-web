import { Page } from "@restruct/ui";
import { FC, PropsWithChildren } from "react";

export const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Page>
            {children}
        </Page>
    )
}