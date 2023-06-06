import { Auth } from 'aws-amplify'

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const currentUser = await Auth.currentAuthenticatedUser()
        if (currentUser != undefined && to.path == "/auth/signin") {
            return navigateTo('/organization')
        }
    } catch (error) {
        if (to.path !== "/auth/signin") {
            return navigateTo('/auth/signin')
        }
    }
})
