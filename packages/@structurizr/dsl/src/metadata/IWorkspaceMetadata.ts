import { IViewMetadata } from "./IViewMetadata";

export interface IWorkspaceMetadata {
    name: string;
    lastModifiedDate: Date;
    views: {
        systemLandscape: IViewMetadata;
        systemContexts: Array<IViewMetadata>;
        containers: Array<IViewMetadata>;
        components: Array<IViewMetadata>;
        deployments: Array<IViewMetadata>;
    }
}