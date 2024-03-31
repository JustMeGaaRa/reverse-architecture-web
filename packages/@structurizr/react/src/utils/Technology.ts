import { IElement } from "@structurizr/dsl";

export const formatElementTechnology = (data: IElement) => {
    if (data?.technology === undefined || data?.technology?.length === 0)
        return "Add technology";

    return data.technology.map(x => x.name).join(", ");
}