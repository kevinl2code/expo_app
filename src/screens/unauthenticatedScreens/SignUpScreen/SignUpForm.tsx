import { View, StyleSheet } from 'react-native'
import { z } from 'zod'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormTextInput, FormCheckbox } from '../../../components/form'
import { Button } from 'react-native-paper'
import { Auth } from 'aws-amplify'
import { FormContainer } from '../../../components/containers/FormContainer'

const SignUpFormSchema = z
  .object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>

interface Props {
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUpForm: React.FC<Props> = ({
  setIsSignedUp,
  setIsLoading,
}) => {
  const { control, formState, handleSubmit } = useForm<SignUpFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(SignUpFormSchema),
  })

  const signUp = async (data: SignUpFormSchemaType) => {
    const { password, email, firstName, lastName } = data
    setIsLoading(true)
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      })
      setIsLoading(false)
      if (!user) {
        throw new Error('No user returned from signUp')
      }
      setIsSignedUp(true)
      console.log(user)
    } catch (error) {
      setIsLoading(false)
      console.log('error signing up:', error)
    }
  }

  return (
    <FormContainer>
      <FormTextInput control={control} name="firstName" label="First Name" />
      <FormTextInput control={control} name="lastName" label="Last Name" />
      <FormTextInput control={control} name="email" label="Email" />
      <FormTextInput control={control} name="password" label="Password" />
      <FormTextInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
      />
      {/* <FormCheckbox control={control} name="terms" label="Accept Terms" /> */}
      <Button
        mode="contained"
        onPress={handleSubmit(signUp)}
        disabled={!formState.isValid}
      >
        Sign Up
      </Button>
    </FormContainer>
  )
}
