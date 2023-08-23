import { TouchableOpacity, StyleSheet } from 'react-native'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormTextInput } from '../../../components/form'
import { Button, Text } from 'react-native-paper'
import { Auth } from 'aws-amplify'
import { useStore } from '../../../store'
import { FormContainer } from '../../../components/containers/FormContainer'
import navigation from '../../../navigation/NavigationService'

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
})

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>

export const SignInForm: React.FC = () => {
  const { control, formState, handleSubmit } = useForm<SignInFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(SignInFormSchema),
  })
  const setTempUser = useStore((state) => state.setTempUser)

  const signIn = async (data: SignInFormSchemaType) => {
    const { password, email } = data
    try {
      const user = await Auth.signIn({
        username: email,
        password,
      })
      // getUser()
      console.log(user)
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'UserNotConfirmedException') {
          console.log('User not verified')
          setTempUser(email)
          navigation.navigate('ConfirmAccountScreen')
        }
      }
      console.log('error signing up:', error)
    }
  }

  return (
    <FormContainer>
      <FormTextInput control={control} name="email" label="Email" />
      <FormTextInput control={control} name="password" label="Password" />
      <Button
        mode="contained"
        onPress={handleSubmit(signIn)}
        disabled={!formState.isValid}
      >
        Sign in
      </Button>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        style={styles.forgotLink}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  linkText: {
    color: 'blue',
  },
  forgotLink: {
    marginTop: 10,
    alignSelf: 'center',
  },
})
