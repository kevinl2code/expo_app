import { Control, Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { HelperText, TextInputProps, TextInput } from 'react-native-paper'
import React from 'react'

interface FormTextInputProps extends TextInputProps {
  name: string
  control: Control<any, object>
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  control,
  name,
  label,
  error,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => {
        let errorMessage = ''
        const hasError = Boolean(errors[name])
        if (hasError) {
          errorMessage = errors[name]?.message?.toString() || ''
        }
        return (
          <>
            <TextInput
              label={label}
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              error={errors.name && true}
            />
            <HelperText type="error">{errorMessage}</HelperText>
          </>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  input: { marginVertical: 5 },
})
