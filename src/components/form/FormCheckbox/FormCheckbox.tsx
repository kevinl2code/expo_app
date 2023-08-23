import { Control, Controller } from 'react-hook-form'
import { Text } from 'react-native'
import {
  HelperText,
  TextInputProps,
  TextInput,
  Checkbox,
} from 'react-native-paper'
import React from 'react'

interface FormCheckboxProps extends TextInputProps {
  name: string
  control: Control<any, object>
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  control,
  name,
  label,
  error,
}) => {
  return (
    <>
      <Text>{label}</Text>
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
          const status = value ? 'checked' : 'unchecked'
          return (
            <>
              <Checkbox
                status={status}
                // onBlur={onBlur}
                onPress={() => onChange(!value)}
                // onChangeText={(value) => onChange(value)}
                // error={errors.name && true}
              />
              <HelperText type="error">{errorMessage}</HelperText>
            </>
          )
        }}
      />
    </>
  )
}
