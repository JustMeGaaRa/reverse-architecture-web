import { IVIewMetadata } from "./IVIewMetadata";

export interface IWorkspaceMetadata {
    name: string;
    lastModifiedDate: Date;
    views: {
        systemLandscape: IVIewMetadata;
        systemContexts: Array<IVIewMetadata>;
        containers: Array<IVIewMetadata>;
        components: Array<IVIewMetadata>;
        deployments: Array<IVIewMetadata>;
    }
}