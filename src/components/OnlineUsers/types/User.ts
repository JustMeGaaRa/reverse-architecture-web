export interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: 0, y: 0 };
    color: string;
    isActive: boolean;
}