interface IProjectInfo {
    projectId: string;
    name: string;
    updated: string;
    updatedBy: string;
    url: string;
}

export class ProjectApi {
    private projects: Array<IProjectInfo> = [
        { projectId: "1", name: "Project 1", updated: "Edited on 29.03.2023", updatedBy: "pavlo@rvrs.io", url: "" },
        { projectId: "2", name: "Project 2", updated: "Edited on 30.03.2023", updatedBy: "vitalii@rvrs.io", url: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jpg" },
        { projectId: "3", name: "Project 3", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "" },
        { projectId: "4", name: "Project 4", updated: "Edited on 31.03.2023", updatedBy: "romano@rvrs.io", url: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg" },
        { projectId: "5", name: "Project 5", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "" },
        { projectId: "6", name: "Project 6", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "" },
        { projectId: "7", name: "Project 7", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "" },
        { projectId: "8", name: "Project 8", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg" },
        { projectId: "9", name: "Project 9", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "" },
        { projectId: "10", name: "Project 10", updated: "Edited on 30.03.2023", updatedBy: "oleh@rvrs.io", url: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg" }
    ];

    constructor(
        private readonly baseUrl: string = ""
    ) { }

    async getProjects(): Promise<Array<IProjectInfo>> {
        return Promise.resolve<Array<IProjectInfo>>(this.projects);
    }

    async addProject(project: any): Promise<IProjectInfo> {
        this.projects.push(project);
        return Promise.resolve(project);
    }

    async removeProject(projectId: string): Promise<IProjectInfo> {
        const project = this.projects.find(project => project.projectId === projectId);
        this.projects = this.projects.filter(project => project.projectId !== projectId);
        return Promise.resolve(project);
    }
}