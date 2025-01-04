import { useSession } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button } from 'react-native-paper'

export const SignOutButton = () => {

  const { signOut } = useSession()
  const router = useRouter()

  // This routing is different to my other routing
  // I had this issue where after signing out the home page would not 
  // rerender without authenticated controls
  // I added an intermediary route called loading
  // it takes in a route and then redirects to that route
  // this forces the home page to rerender without authenticated controls
  const handleNavigation = () => {
    signOut()
    router.push('/loading?route=/')
  }

  return (
    <Button
      onPress={handleNavigation}
    >
      Sign Out
    </Button>
  )
}
