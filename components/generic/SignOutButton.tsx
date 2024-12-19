import { useSession } from '@/contexts/AuthContext'
import React from 'react'
import { Button } from 'react-native-paper'

const SignOutButton = () => {

    const { signOut } = useSession()

  return (
    <Button 
      onPress={signOut}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton