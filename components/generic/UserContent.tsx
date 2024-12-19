import { UserResources } from '@/types/resources'
import React from 'react'
import { View } from 'react-native'

type Props = {
  userResouces: UserResources
}

// create me later
const UserContent = ({userResouces}: Props) => {
  return (
    <View>
      {JSON.stringify(userResouces)}
    </View>
  )
}

export default UserContent