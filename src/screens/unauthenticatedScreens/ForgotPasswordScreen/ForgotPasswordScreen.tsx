import { StackScreenProps } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { ScreenContainer } from '../../../components/containers/ScreenContainer'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { UnauthenticatedStackParamList } from '../../../navigation/UnauthenticatedNavigator'

type Props = StackScreenProps<
  UnauthenticatedStackParamList,
  'ForgotPasswordScreen'
>

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text variant="displaySmall" style={styles.headerText}>
        Forgot Password
      </Text>
      <ForgotPasswordForm />
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
