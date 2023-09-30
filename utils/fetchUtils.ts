import useSWR from "swr";

export const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())


export function getAllUsers() {
    const { data, error, isLoading } = useSWR('/api/users/all', fetcher);

    return {
        usersa: data,
        isError: error,
        isLoading
    }
}