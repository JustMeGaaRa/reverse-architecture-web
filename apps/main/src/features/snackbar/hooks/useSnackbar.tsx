import { useToast } from "@chakra-ui/react";
import { Snackbar } from "../components";

export const useSnackbar = () => {
    const toast = useToast({
        position: "bottom-right",
        duration: 999000,
        isClosable: false,
        render: (props) => (<Snackbar {...props} />)
    });

    return {
        snackbar: toast
    };
}