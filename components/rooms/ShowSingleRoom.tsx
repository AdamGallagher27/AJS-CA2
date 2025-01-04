import { isAdmin } from '@/hooks/isAdmin'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import { NoResources } from '../generic/NoResources'
import { Room, Surgery } from '@/types/resources'
import { DeleteModal } from '../generic/DeleteModal'
import { useRouter } from 'expo-router'

type Props = {
  room: Room
}

export const ShowSingleRoom = ({ room }: Props) => {
  const {
    _id,
    room_number,
    room_type,
    daily_rate,
    availability_status,
    hospital,
    surgeries,
    createdAt,
    updatedAt,
    is_deleted
  } = room

  if (is_deleted) {
    return <NoResources resourceName='Room' />
  }

  const admin = isAdmin()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const editPath = `/resources/rooms/${_id}/edit`

  const onDismiss = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card>
        <Card.Content>
          <Title>Room Number: {room_number}</Title>
          <Paragraph>Room Type: {room_type}</Paragraph>

          <View style={styles.margin}>
            <Chip style={styles.margin}>Daily Rate: {daily_rate}</Chip>
            <Chip>Hospital: {hospital?.title}</Chip>
          </View>

          <View style={styles.margin}>
            <Chip
              style={[
                availability_status ? styles.available : styles.notAvailable,
              ]}
              icon={availability_status ? 'check-circle' : 'close-circle'}
            >
              {availability_status ? 'Room Available' : 'Room Not Available'}
            </Chip>
          </View>

          {(createdAt && updatedAt) &&
            <View style={styles.margin}>
              <Paragraph>Created At: {new Date(createdAt).toLocaleString()}</Paragraph>
              <Paragraph>Updated At: {new Date(updatedAt).toLocaleString()}</Paragraph>
            </View>
          }

          {admin &&
            <View style={styles.buttonContainer}>
              <Button mode='contained' onPress={() => router.push(editPath as never)}>Edit</Button>
              <Button mode='outlined' onPress={() => setShowDeleteModal(true)}>Delete</Button>
            </View>
          }

          {(surgeries && surgeries?.length > 0) && <List.Section>
            <List.Subheader>Available Surgeries</List.Subheader>
            {surgeries.map(({ _id, surgery_type, duration }: Surgery) => (
              <List.Item
                key={_id}
                title={`Surgery Type : ${surgery_type}`}
                description={`Duration in Hours : ${duration}`}
              />
            ))}
          </List.Section>}

        </Card.Content>
      </Card>

      {admin &&
        <DeleteModal
          isVisible={showDeleteModal}
          onDismiss={onDismiss}
          resourceName='rooms'
          id={_id}
        />}
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    gap: 6,
    marginTop: 12 
  },
  margin: {
    marginBottom: 6
  },
  available: {
    backgroundColor: '#d4edda',
  },
  notAvailable: {
    backgroundColor: '#f8d7da',
  },
})
