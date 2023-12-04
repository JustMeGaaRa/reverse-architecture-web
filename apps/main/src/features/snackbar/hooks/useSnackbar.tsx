import { ToastProps, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { Snackbar } from "../components";

export const useSnackbar = () => {
    const toast = useToast();

    const snackbar = useCallback((props: ToastProps) => {
        toast({
            ...props,
            position: "top-right",
            duration: 9000,
            render: (props) => (<Snackbar {...props} />)
        });
    }, [toast])

    return {
        snackbar
    };
}