import { Auth } from 'aws-amplify'

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        //await Auth.signOut()
        const currentUser = await Auth.currentAuthenticatedUser()
        //console.log("currentUser")
        //console.log(currentUser.attributes)
        if (currentUser != undefined && to.path == "/auth/signin") {
            //return navigateTo('/organization')
            return navigateTo('/')
        }
    } catch (error) {
        if (to.path !== "/auth/signin") {
            return navigateTo('/auth/signin')
        }
    }
})
