import { useContext } from "react";
import { AccountContext } from ".";

export const useAccount = () => {
    const { account } = useContext(AccountContext);

    return { account };
}