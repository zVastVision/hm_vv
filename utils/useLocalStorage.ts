export const useGetLocalStorageJSON = (key: string) : unknown => {
    const value: string | null = localStorage.getItem(key)
    if (value == null) {
        return null
    } else {
        try {
            return JSON.parse(value)
        } catch (error) {
            return null
        }
    }
}

export const useSetLocalStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
}