import { Amplify, Auth } from 'aws-amplify'
import { PaperProvider } from 'react-native-paper'
import React from 'react'
import { NavigationStack } from './src/navigation'
import awsmobile from './aws-exports'
import { SafeAreaProvider } from 'react-native-safe-area-context'
Amplify.Logger.LOG_LEVEL = 'INFO'

Amplify.configure(awsmobile)

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationStack />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
export default App
