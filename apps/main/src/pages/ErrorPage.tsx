import { useToast } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate, useRouteError } from "react-router";

export const ErrorPage: FC<{
}> = ({
}) => {
    const navigate = useNavigate();
    const { error } = useRouteError() as { error: Error };
    const { name, message } = error ?? { name: "Error", message: "Oops, something went wrong..." };
    const toast = useToast();

    toast({
        title: name,
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
    })

    return (
        <></>
    )
}