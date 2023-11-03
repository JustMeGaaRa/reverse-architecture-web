import { Page } from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";

export const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Page>
            {children}
        </Page>
    )
}