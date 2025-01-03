import { UserResources } from '@/types/resources'
import React from 'react'
import { View } from 'react-native'
import { Title } from 'react-native-paper'
import { CreatedResourceCard } from './CreatedResourceCard'

type Props = {
  userResouces: UserResources
}

export const UserContent = ({userResouces}: Props) => {
  return (
    <View>
      {Object.entries(userResouces).map(([resourceType, resourceArray]) => {
        return (
          <View key={resourceType}>
            <Title>{resourceType}</Title>
            <CreatedResourceCard resourceType={resourceType} resource={resourceArray} />
          </View>
        )
      })}
    </View>
  )
}
