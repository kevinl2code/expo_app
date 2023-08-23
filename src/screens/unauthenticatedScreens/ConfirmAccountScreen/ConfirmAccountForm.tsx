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

const ConfirmAccountFormSchema = z.object({
  // email: z.string().email(),
  verificationCode: z.string().min(2).max(20),
})

type ConfirmAccountFormSchemaType = z.infer<typeof ConfirmAccountFormSchema>

export const ConfirmAccountForm = () => {
  const { control, formState, handleSubmit } =
    useForm<ConfirmAccountFormSchemaType>({
      mode: 'onChange',
      defaultValues: {
        verificationCode: '',
      },
      resolver: zodResolver(ConfirmAccountFormSchema),
    })
  const email = useStore((state) => state.tempUser)
  const confirmSignUp = async (data: ConfirmAccountFormSchemaType) => {
    const { verificationCode } = data

    try {
      if (!email) {
        throw new Error('No email found')
      }
      await Auth.confirmSignUp(email, verificationCode)
    } catch (error) {
      console.log('error confirming sign up', error)
    }
  }

  const resendConfirmationCode = async () => {
    try {
      if (!email) {
        throw new Error('No email found')
      }
      // const user = await Auth.currentUserPoolUser()
      // console.log('user: ', user)
      await Auth.resendSignUp(email)
      console.log('code resent successfully')
    } catch (err) {
      console.log('error resending code: ', err)
    }
  }

  return (
    <FormContainer>
      <FormTextInput
        control={control}
        name="verificationCode"
        label="Verification Code"
      />
      <Button
        mode="contained"
        onPress={handleSubmit(confirmSignUp)}
        disabled={!formState.isValid}
      >
        Confirm Sign Up
      </Button>
      <Button
        mode="contained"
        onPress={resendConfirmationCode}
        style={styles.resendButton}
        // disabled={!formState.isValid}
      >
        Re-send Confirmation Code
      </Button>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  resendButton: {
    marginTop: 20,
  },
})
