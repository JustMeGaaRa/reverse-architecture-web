import { ProjectInfo } from "../model";

export class ProjectApi {
    private projects: Array<ProjectInfo>;

    constructor(
        private readonly baseUrl: string = ""
    ) {
        this.projects = [
            { projectId: "1", name: "Project 1", createdDate: "29.03.2023", createdBy: "pavlo@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "pavlo@rvrs.io", coverUrl: "" },
            { projectId: "2", name: "Project 2", createdDate: "29.03.2023", createdBy: "vitalii@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "vitalii@rvrs.io", coverUrl: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jpg" },
            { projectId: "3", name: "Project 3", createdDate: "29.03.2023", createdBy: "oleh@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "oleh@rvrs.io", coverUrl: "" },
            { projectId: "4", name: "Project 4", createdDate: "29.03.2023", createdBy: "romano@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "romano@rvrs.io", coverUrl: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg" },
            { projectId: "5", name: "Project 5", createdDate: "29.03.2023", createdBy: "pavlo@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "pavlo@rvrs.io", coverUrl: "" },
            { projectId: "6", name: "Project 6", createdDate: "29.03.2023", createdBy: "vitalii@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "vitalii@rvrs.io", coverUrl: "" },
            { projectId: "7", name: "Project 7", createdDate: "29.03.2023", createdBy: "oleh@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "oleh@rvrs.io", coverUrl: "" },
            { projectId: "8", name: "Project 8", createdDate: "29.03.2023", createdBy: "romano@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "romano@rvrs.io", coverUrl: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg" },
            { projectId: "9", name: "Project 9", createdDate: "29.03.2023", createdBy: "pavlo@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "pavlo@rvrs.io", coverUrl: "" },
            { projectId: "10", name: "Project 10", createdDate: "29.03.2023", createdBy: "vitalii@rvrs.io", lastModifiedDate: "29.03.2023", lastModifiedBy: "vitalii@rvrs.io", coverUrl: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg" }
        ];
    }

    async getProjects(): Promise<Array<ProjectInfo>> {
        return Promise.resolve<Array<ProjectInfo>>(this.projects);
    }

    async saveProject(project: ProjectInfo): Promise<ProjectInfo> {
        this.projects.push(project);
        return Promise.resolve(project);
    }

    async deleteProject(projectId: string): Promise<void> {
        this.projects = this.projects.filter(project => project.projectId !== projectId);
        return Promise.resolve();
    }
}