import { Auth } from "aws-amplify"

export const useAuthStore = defineStore('auth', {
    state: () => ({}),
    actions: {
        login:async (username:string, password: string) => {
            let res
            try {
            res = await Auth.signIn(username, password)
            console.log(res)
            } catch (error) {
                res = null
            }
            if (res == null) {
                throw Error("Invalid email or password")
            }
        }
    }
})

