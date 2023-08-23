import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { SignUpForm } from './SignUpForm'
import { Text } from 'react-native-paper'
import { ScreenContainer } from '../../../components/containers/ScreenContainer'
import { UnauthenticatedStackParamList } from '../../../navigation/UnauthenticatedNavigator'

type Props = StackScreenProps<UnauthenticatedStackParamList, 'SignUpScreen'>

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [isSignedUp, setIsSignedUp] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (isSignedUp) {
      navigation.navigate('ConfirmAccountScreen')
    }
    return () => {
      setIsSignedUp(false)
    }
  }, [isSignedUp])

  return (
    <ScreenContainer>
      <Text variant="displaySmall" style={styles.headerText}>
        Create Account
      </Text>
      <SignUpForm setIsSignedUp={setIsSignedUp} setIsLoading={setIsLoading} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})
