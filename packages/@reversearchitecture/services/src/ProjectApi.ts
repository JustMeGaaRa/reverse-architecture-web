import Projects from "../data/projects/list.json";

type Project = typeof Projects.values[0];

export class ProjectApi {
    async getProjects(): Promise<Array<Project>> {
        return Promise.resolve<Array<Project>>(Projects.values);
    }
}