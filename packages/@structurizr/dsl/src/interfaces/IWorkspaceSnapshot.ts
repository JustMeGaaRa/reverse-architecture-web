import { IProperties } from "./IProperties";
import { IViews } from "./IViews";
import { IModel } from "./IModel";

export interface IWorkspaceSnapshot {
    version: number;
    lastModifiedDate?: string;
    name?: string;
    description?: string;
    properties?: IProperties;
    model: IModel;
    views: IViews;
}