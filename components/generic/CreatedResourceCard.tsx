import { Hospital, Patient, Room, Surgery, Worker } from '@/types/resources'
import { getPropertyNameBasedOnResourceType, getRouteBasedOnResourceType } from '@/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Card, Title } from 'react-native-paper'

type Props = {
  resourceType: string
  resource?: Hospital[] | Room[] | Surgery[] | Patient[] | Worker[]
}

export const CreatedResourceCard = ({resourceType, resource}: Props) => {

  if(!resource ) return null

  const router = useRouter()
  const property = getPropertyNameBasedOnResourceType(resourceType)

  if(!property) return null

  const cards = resource.map(resource => {
    const path = getRouteBasedOnResourceType(resourceType, resource._id)

    return (
    // had to add as never to path to prevent ts error
    <Card key={resource._id} style={{ margin: 10 }} onPress={() => router.push(path as never)}>
      <Card.Content>
        {/* had to add as any to prevent ts error */}
        <Title>{(resource as any)[property]}</Title>
      </Card.Content>
    </Card>
    )
  })

  return cards
}

