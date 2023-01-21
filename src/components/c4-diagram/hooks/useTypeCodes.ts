import { useCallback, useState } from "react"

const useTypeCodes = () => {
    const [codes, setCodes] = useState({
        ["software-system"]: "Software System",
        ["container"]: "Container",
        ["component"]: "Component",
        ["person"]: "Person"
    });

    // TODO: useEffect to fetch coodes from an API
    // useEffect(async () => {
    //     const result = await fetch("%API_URL%");
    //     setCodes(result);
    // });

    const getCodeName = useCallback((code: string) => {
        return codes[code];
    }, [codes]);

    return {
        codes,
        getCodeName
    }
}

export { useTypeCodes };