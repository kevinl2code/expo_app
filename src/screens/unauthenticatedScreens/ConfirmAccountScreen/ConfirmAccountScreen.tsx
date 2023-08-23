import { StackScreenProps } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { ConfirmAccountForm } from './ConfirmAccountForm'
import { ScreenContainer } from '../../../components/containers/ScreenContainer'
import { UnauthenticatedStackParamList } from '../../../navigation/UnauthenticatedNavigator'

type Props = StackScreenProps<
  UnauthenticatedStackParamList,
  'ConfirmAccountScreen'
>

export const ConfirmAccountScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text variant="displaySmall" style={styles.headerText}>
        Verify Account Email
      </Text>

      <ConfirmAccountForm />
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
