import { Page } from "@reversearchitecture/ui";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthorizePage: FC = () => {
    const [ queryParams ] = useSearchParams([
        ["code", ""]
    ]);

    return (
        <Page>
        </Page>
    )
}