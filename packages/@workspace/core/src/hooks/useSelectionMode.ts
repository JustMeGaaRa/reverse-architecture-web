import { useState } from "react";

export const useSelectionMode = () => {
    const [ isSelectionEnabled, setSelectionMode ] = useState(true);

    return { isSelectionEnabled, setSelectionMode }
}