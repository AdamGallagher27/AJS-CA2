import { useSession } from '@/contexts/AuthContext'
import React from 'react'
import { Button } from 'react-native-paper'

export const SignOutButton = () => {

    const { signOut } = useSession()

  return (
    <Button 
      onPress={signOut}
    >
      Sign Out
    </Button>
  )
}
