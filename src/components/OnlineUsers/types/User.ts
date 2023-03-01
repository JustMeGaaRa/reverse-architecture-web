export interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: number, y: number };
    color: string;
    isActive: boolean;
}