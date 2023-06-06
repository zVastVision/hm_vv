import { Auth } from "aws-amplify"

export const useGetUserGroups = async () => {
    const currentUser = await Auth.currentAuthenticatedUser()
    return currentUser.signInUserSession.accessToken.payload['cognito:groups'] as string[]
}