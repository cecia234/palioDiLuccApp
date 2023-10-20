import useSWR from "swr";

export const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())


export function getAllUsers() {
    const { data, error, isLoading } = useSWR('/api/users/all', fetcher);

    return {
        users: data ? data.users : undefined,
        isError: error,
        isLoading
    }
}

export function getAllUsersAvailableForAchievementRequest(currentUserUid: string, achievementName: string) {
    const { data, error, isLoading } = useSWR(`/api/users/${currentUserUid}/availableForAchievement/${achievementName}`, fetcher);

    return {
        users: data ? data.users : undefined,
        isError: error,
        isLoading
    }
}