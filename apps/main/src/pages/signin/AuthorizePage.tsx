import { Page } from "@reversearchitecture/ui";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { app } from "./SignInPage";

export const AuthorizePage: FC = () => {
    const [ queryParams ] = useSearchParams([
        ["code", ""]
    ]);

    useEffect(() => {
        // app.oauth.createToken({
        //     code: queryParams.get("code")
        // })
        // .then(response => {
        //     console.log(response.authentication.token)
        // })
        // .catch(error => {
        //     console.error(error)
        // });
    }, [queryParams]);

    return (
        <Page>
        </Page>
    )
}