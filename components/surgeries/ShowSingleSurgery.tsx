import { isAdmin } from '@/hooks/isAdmin'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import { NoResources } from '../generic/NoResources'
import { Surgery, Worker } from '@/types/resources'
import { DeleteModal } from '../generic/DeleteModal'
import { useRouter } from 'expo-router'

type Props = {
  surgery: Surgery
}

export const ShowSingleSurgery = ({ surgery }: Props) => {
  const {
    _id,
    surgery_type,
    duration,
    patient,
    room,
    workers,
    createdAt,
    updatedAt,
    is_deleted
  } = surgery

  if (is_deleted) {
    return <NoResources resourceName='Surgery' />
  }

  const admin = isAdmin()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const editPath = `/resources/surgeries/${_id}/edit`
  const viewAllPath = '/resources/surgeries'

  const onDismiss = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card>
        <Card.Content>
          <Title>Surgery Type: {surgery_type}</Title>
          <Paragraph>Duration in Hours: {duration}</Paragraph>
          <View style={styles.margin}>
            {patient && <Chip style={styles.margin}>Patient Name: {patient.first_name} {patient.last_name}</Chip>}
            {room && <Chip>Room: {room.room_type} {room.room_number}</Chip>}
          </View>

          {(createdAt && updatedAt) &&
            <View style={styles.margin}>
              <Paragraph>Created At: {new Date(createdAt).toLocaleString()}</Paragraph>
              <Paragraph>Updated At: {new Date(updatedAt).toLocaleString()}</Paragraph>
            </View>
          }

          <View style={styles.buttonContainer}>
            {admin &&
              <>
                <Button mode='contained' onPress={() => router.push(editPath as never)}>Edit</Button>
                <Button mode='outlined' onPress={() => setShowDeleteModal(true)}>Delete</Button>
              </>
            }
            <Button mode='outlined' onPress={() => router.push(viewAllPath as never)}>View All</Button>
          </View>

          {workers && workers.length > 0 && (
            <List.Section>
              <List.Subheader>Workers</List.Subheader>
              {workers.map(({ _id, first_name, last_name, worker_role }: Worker) => (
                <List.Item
                  key={_id}
                  title={`Worker Name: ${first_name} ${last_name}`}
                  description={`Job Title: ${worker_role}`}
                />
              ))}
            </List.Section>
          )}

        </Card.Content>
      </Card>

      {admin &&
        <DeleteModal
          isVisible={showDeleteModal}
          onDismiss={onDismiss}
          resourceName='surgeries'
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
})
