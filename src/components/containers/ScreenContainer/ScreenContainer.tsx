import { View, StyleSheet, ViewProps } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends ViewProps {
  children: React.ReactNode
}

export const ScreenContainer: React.FC<Props> = (props) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const paddingLeft = insets.left > 0 ? insets.left : '1rem'
  const paddingRight = insets.right > 0 ? insets.right : '1rem'
  console.log({ insets })
  return (
    <View
      {...props}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
      }}
    >
      {props.children}
    </View>
  )
}
