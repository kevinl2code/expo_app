import { BottomNavigation } from 'react-native-paper'
import { FeedScreen } from '../../screens/authenticatedScreens/FeedScreen'
import { SettingsScreen } from '../../screens/authenticatedScreens/SettingsScreen'
import {
  AuthenticatedNavigator,
  AuthenticatedStackParamList,
} from '../AuthenticatedNavigator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type BottomTabNavigatorParamList = {
  Home: AuthenticatedStackParamList
  Feed: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const BottomTabsNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={AuthenticatedNavigator}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={size} color={color} />
        },
      }}
    />
    <Tab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarLabel: 'Feed',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="rss" size={size} color={color} />
        },
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="settings-helper" size={size} color={color} />
        },
      }}
    />
  </Tab.Navigator>
)
