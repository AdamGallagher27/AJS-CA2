import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

// I added this loading screen because when the user signs in or out 
// the tabs would not refresh and the screen would show wrong data 
// i.e unauthenticated users still have authenticated controls 

// By routing to this page first 
// with the desired route as local search param I can force the tabs to reload
// I only use this for signing in and signing out
const LoadingScreen = () => {
  const router = useRouter()
  const { route } = useLocalSearchParams()

  useEffect(() => {
    if (route) {
      router.replace(route as never)
    } else {
      router.replace('/')
    }
  }, [route, router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#0000ff' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingScreen