import { IElement } from "@structurizr/dsl";

export const formatElementTechnology = (data: IElement) => {
    return data?.technology?.map(x => x.name).join(", ") ?? "";
}