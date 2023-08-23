import * as React from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from './NavigationService'
import { Hub } from 'aws-amplify'
import { UnauthenticatedNavigator } from './UnauthenticatedNavigator'
import { AuthenticatedNavigator } from './AuthenticatedNavigator'
import { BottomTabsNavigator } from './BottomTabsNavigator/BottomTabsNavigator'

export type RootStackParamList = {
  UnauthenticatedStack: undefined
  AuthenticatedStack: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

interface IProps {
  theme: Theme
}

export const NavigationStack: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
        setIsLoggedIn(true)
        break
      case 'autoSignIn':
        setIsLoggedIn(true)
        break
      case 'signOut':
        setIsLoggedIn(false)
        break
    }
  })

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
      {isLoggedIn ? (
        <BottomTabsNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="UnauthenticatedStack"
            component={UnauthenticatedNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              // headerRight: () => <ThemeController />,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

// RETURN STATEMENT PRIOR TO ADDING BOTTOM TAB NAVIGATION
// return (
//   <NavigationContainer ref={navigationRef}>
//     {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}

//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isLoggedIn ? (
//         <Stack.Screen
//           name="AuthenticatedStack"
//           component={AuthenticatedNavigator}
//         />
//       ) : (
//         <Stack.Screen
//           name="UnauthenticatedStack"
//           component={UnauthenticatedNavigator}
//           options={{
//             // When logging out, a pop animation feels intuitive
//             // You can remove this if you want the default 'push' animation
//             animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
//             // headerRight: () => <ThemeController />,
//           }}
//         />
//       )}
//     </Stack.Navigator>
//   </NavigationContainer>
// )
