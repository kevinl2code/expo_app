import { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'
import {
  GOOGLE_OAUTH_WEB_CLIENT_SECRET,
  GOOGLE_OAUTH_ANDROID_CLIENT_ID,
  GOOGLE_OAUTH_IOS_CLIENT_ID,
  GOOGLE_OAUTH_WEB_CLIENT_ID,
} from '@env'
import React from 'react'
import AWS from 'aws-sdk'
import { AuthError, TokenResponse } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

type GoogleResponse = {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

function signinCallback(authResult: AuthSessionResult | null) {
  if (authResult !== null && authResult.type === 'success') {
    // Add the Google access token to the Amazon Cognito credentials login map.
    const credentials = (AWS.config.credentials =
      new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:e5d322c1-2702-4daf-a63f-b81bd60024dc',
        Logins: {
          'accounts.google.com': authResult['params']['id_token'],
        },
      }))
    console.log('credentials', credentials)
    // Obtain AWS credentials
    // AWS.config.credentials.sessionToken
    return credentials.data
  }
}

export const AuthScreen = () => {
  const [token, setToken] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<GoogleResponse | null>(null)

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: GOOGLE_OAUTH_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_OAUTH_IOS_CLIENT_ID,
    expoClientId: GOOGLE_OAUTH_WEB_CLIENT_ID,
  })

  React.useEffect(() => {
    if (response?.type === 'success') {
      if (response?.authentication?.accessToken) {
        setToken(response.authentication.accessToken)
      }
    }
    const data = signinCallback(response)
    console.log('data', data)
    token && getUserInfo()
  }, [response, token])

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!response) {
        throw new Error('No response')
      }

      const user: GoogleResponse = await response.json()
      // console.log(user)
      if (!user) {
        throw new Error('No user')
      }

      setUserInfo(user)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userInfo)
  const ShowUserInfo = () => {
    return (
      <View>
        <Text>{userInfo?.name}</Text>
        <Text>{userInfo?.email}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {userInfo && <ShowUserInfo />}
      {!userInfo && (
        <>
          <Text>Welcome</Text>
          {/* <TouchableOpacity onPress={() => promptAsync()}>
            <Text>Login</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => promptAsync()}>
            <Text>Login</Text>
          </TouchableOpacity>
        </>
      )}
      <Text>Auth Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export type AuthSessionResult =
  | {
      /**
       * How the auth completed.
       */
      type: 'cancel' | 'dismiss' | 'opened' | 'locked'
    }
  | {
      /**
       * How the auth completed.
       */
      type: 'error' | 'success'
      /**
       * @deprecated Legacy error code query param, use `error` instead.
       */
      errorCode: string | null
      /**
       * Possible error if the auth failed with type `error`.
       */
      error?: AuthError | null
      /**
       * Query params from the `url` as an object.
       */
      params: Record<string, string>
      /**
       * Returned when the auth finishes with an `access_token` property.
       */
      authentication: TokenResponse | null
      /**
       * Auth URL that was opened
       */
      url: string
    }
