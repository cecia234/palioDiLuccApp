export interface IAchievement {
    name: string,
    icon: string,
    status: EAchievementStatus,
    description?: string,
}

export enum EAchievementStatus {
    UNDONE = 0,
    PENDING = 1,
    DONE = 2,
}

export interface IUser {
    username: string,
    name: string,
    surname: string,
    email: string
}