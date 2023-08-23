import { View, StyleSheet } from 'react-native'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormTextInput, FormCheckbox } from '../../../components/form'
import { Button } from 'react-native-paper'
import { Auth } from 'aws-amplify'
import { useStore } from '../../../store'
import { FormContainer } from '../../../components/containers/FormContainer'

const ForgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>

export const ForgotPasswordForm = () => {
  const { control, formState, handleSubmit } =
    useForm<ForgotPasswordFormSchemaType>({
      mode: 'onChange',
      defaultValues: {
        email: '',
      },
      resolver: zodResolver(ForgotPasswordFormSchema),
    })

  const sendResetCode = async (data: ForgotPasswordFormSchemaType) => {
    const { email } = data

    try {
      if (!email) {
        throw new Error('No email found')
      }
      await Auth.forgotPassword(email)
    } catch (error) {
      console.log('error sending forgot password code', error)
    }
  }

  return (
    <FormContainer>
      <FormTextInput control={control} name="email" label="Email" />
      <Button
        mode="contained"
        onPress={handleSubmit(sendResetCode)}
        disabled={!formState.isValid}
      >
        Send Code
      </Button>
    </FormContainer>
  )
}
