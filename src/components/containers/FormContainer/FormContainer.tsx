import { View, ViewProps } from 'react-native'
import { useTheme } from 'react-native-paper'

interface Props extends ViewProps {
  children: React.ReactNode
}

export const FormContainer: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <View
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: '1rem',
        width: '100%',
      }}
    >
      {props.children}
    </View>
  )
}
