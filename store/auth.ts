import { Auth } from "aws-amplify"

export const useAuthStore = defineStore('auth', {
    state: () => ({}),
    actions: {
        login:async (username:string, password: string) => {
            let res
            try {
            //res = await Auth.signUp({username, password, attributes: {given_name:'Jordan', family_name:'Zotts', profile:'', picture:''}})
            //const auth_code = '794266'
            //res = await Auth.confirmSignUp(username, auth_code)
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

