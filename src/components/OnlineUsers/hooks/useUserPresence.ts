import { useSelf, useSetPresence } from "@y-presence/react";
import { User } from "../types";

export const useUserPresence = () => {
    return {
        users: []
    };
}