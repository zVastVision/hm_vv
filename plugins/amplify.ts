import { Amplify, AuthModeStrategyType, Logger } from 'aws-amplify';
import awsconfig from '~/src/aws-exports';

export default defineNuxtPlugin(() => {
    Amplify.configure({
        ...awsconfig,
        DataStore: {
          authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
          errorHandler: (error:unknown) => {
          console.error('Unrecoverable error', { error })
        },
        },
      })
    Logger.LOG_LEVEL = "DEBUG"
})