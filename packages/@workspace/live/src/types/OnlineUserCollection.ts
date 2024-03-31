import { IObservable } from "@structurizr/dsl";
import { Awareness } from "y-protocols/awareness";
import { WorkspaceUser } from "./WorkspaceUser";

export class OnlineUserCollection implements IObservable {
    constructor(private readonly awareness: Awareness) {}

    public toArray() {
        return Array
            .from(this.awareness.getStates() ?? [])
            .map(([, value]) => value as WorkspaceUser)
            .filter(user => user !== null && user !== undefined)
    }

    public getCurrentUser() {
        return this.awareness.getLocalState() as WorkspaceUser;
    }

    public getCollaboratingUsers() {
        return Array
            .from(this.awareness.getStates() ?? [])
            .filter(([key, ]) => key !== this.awareness.clientID)
            .map(([, value]) => value as WorkspaceUser)
            .filter(user => user !== null && user !== undefined)
    }

    public subscribe(observer: () => void): void {
        
    }

    public unsubscribe(observer: () => void): void {
        
    }
}