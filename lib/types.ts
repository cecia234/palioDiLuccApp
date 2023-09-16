export interface IAchievement {
    name: string,
    icon: string,
    status: 'done' | 'undone',
    description?: string,
}
