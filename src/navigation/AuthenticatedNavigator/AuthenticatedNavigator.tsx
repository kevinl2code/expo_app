import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../../screens/authenticatedScreens/HomeScreen/HomeScreen'

export type AuthenticatedStackParamList = {
  HomeScreen: undefined
}

const AuthenticatedStack = createStackNavigator<AuthenticatedStackParamList>()

export const AuthenticatedNavigator: React.FC = () => (
  <AuthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthenticatedStack.Screen name="HomeScreen" component={HomeScreen} />
  </AuthenticatedStack.Navigator>
)
