import { useRouter } from 'expo-router'
import React from 'react'
import { Card, Title } from 'react-native-paper'

type Props = {
  title: string
}

export const ResourceTitleCard = ({title}: Props) => {
  const router = useRouter()
  const path = `./resources/${title}`

  return (
    // as never prevents this error
    // Argument of type 'string' is not assignable to parameter of type 'RelativePathString
    <Card style={{ margin: 16, marginBottom: 8 }} onPress={() => router.push(path as never)}>
    <Card.Content>
      <Title>{title}</Title>
    </Card.Content>
  </Card>
  )
}

