import { Button, Text } from 'react-native-paper'
import { ScreenContainer } from '../../../components/containers/ScreenContainer'
import { Auth } from 'aws-amplify'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthenticatedStackParamList } from '../../../navigation/AuthenticatedNavigator'

type Props = StackScreenProps<AuthenticatedStackParamList, 'HomeScreen'>

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const signOut = async () => {
    try {
      const loggedOut = await Auth.signOut()
      navigation.navigate('HomeScreen')
      // getUser()
      console.log('loggedOut', loggedOut)
    } catch (error) {
      if (error instanceof Error) {
        console.log('User not verified')
        // setTempUser(email)
        console.log('error signing out:', error.message)
      }
      console.log('error signing out:', error)
    }
  }

  return (
    <ScreenContainer>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={signOut}>
        Log Out
      </Button>
    </ScreenContainer>
  )
}
