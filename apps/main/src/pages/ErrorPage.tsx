import { FC } from "react";
import { useNavigate, useRouteError } from "react-router";
import { useSnackbar } from "../features";

export const ErrorPage: FC<{
}> = ({
}) => {
    const navigate = useNavigate();
    const { error } = useRouteError() as { error: Error };
    const { name, message } = error ?? { name: "Error", message: "Oops, something went wrong..." };
    const { snackbar } = useSnackbar();

    snackbar({
        title: message,
        description: message,
        status: "error",
        duration: 5000,
    })

    return (<></>)
}