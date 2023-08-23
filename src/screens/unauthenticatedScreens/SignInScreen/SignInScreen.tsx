import { StackScreenProps } from '@react-navigation/stack'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { SignInForm } from './SignInForm'
import { useState } from 'react'
import { ScreenContainer } from '../../../components/containers/ScreenContainer'
import { UnauthenticatedStackParamList } from '../../../navigation/UnauthenticatedNavigator'

type Props = StackScreenProps<UnauthenticatedStackParamList, 'SignInScreen'>

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ScreenContainer>
      <View style={styles.appNameContainer}>
        <Image
          source={require('../../../../assets/ai-logo.png')}
          style={{
            width: '100%',
            height: '50%',
          }}
        />
        <Text variant="displaySmall" style={styles.headerText}>
          App Name
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <SignInForm />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.linkText}>Sign up for free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  appNameContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  actionsContainer: {
    width: '100%',
  },
  signUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  signUpText: {
    marginRight: 5,
  },
  linkText: {
    color: 'blue',
  },
})
