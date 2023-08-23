import { createStackNavigator } from '@react-navigation/stack'
import { SignInScreen } from '../../screens/unauthenticatedScreens/SignInScreen'
import { ForgotPasswordScreen } from '../../screens/unauthenticatedScreens/ForgotPasswordScreen'
import { SignUpScreen } from '../../screens/unauthenticatedScreens/SignUpScreen'
import { ConfirmAccountScreen } from '../../screens/unauthenticatedScreens/ConfirmAccountScreen'

export type UnauthenticatedStackParamList = {
  SignInScreen: undefined
  SignUpScreen: undefined
  ConfirmAccountScreen: undefined
  ForgotPasswordScreen: undefined
}

const UnauthenticatedStack =
  createStackNavigator<UnauthenticatedStackParamList>()

export const UnauthenticatedNavigator: React.FC = () => {
  return (
    <UnauthenticatedStack.Navigator>
      <UnauthenticatedStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          animationTypeForReplace: 'push',
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}
      />
      <UnauthenticatedStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Back to Sign In',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}
      />
      <UnauthenticatedStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Back to Sign In',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}
      />
      <UnauthenticatedStack.Screen
        name="ConfirmAccountScreen"
        component={ConfirmAccountScreen}
        options={{
          title: 'Cancel',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}
      />
    </UnauthenticatedStack.Navigator>
  )
}
