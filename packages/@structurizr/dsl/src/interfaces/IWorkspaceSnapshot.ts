import { IProperties } from "./IProperties";
import { IViews } from "./IViews";
import { IModel } from "./IModel";


export interface IWorkspaceSnapshot {
    version: number;
    name?: string;
    description?: string;
    lastModifiedDate?: string;
    properties?: IProperties;
    model: IModel;
    views: IViews;
}
