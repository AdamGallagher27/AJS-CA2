import { isAdmin } from '@/hooks/isAdmin'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import { NoResources } from '../generic/NoResources'
import { Worker, Surgery } from '@/types/resources'
import { DeleteModal } from '../generic/DeleteModal'
import { useRouter } from 'expo-router'

type Props = {
  worker: Worker
}

export const ShowSingleWorker = ({ worker }: Props) => {
  const {
    _id,
    first_name,
    last_name,
    worker_role,
    surgeries,
    createdAt,
    updatedAt,
    is_deleted
  } = worker

  if (is_deleted) {
    return <NoResources resourceName='Worker' />
  }

  const admin = isAdmin()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const editPath = `/resources/workers/${_id}/edit`

  const onDismiss = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card>
        <Card.Content>
          <Title>Worker Name: {first_name} {last_name}</Title>
          <Paragraph>Job Title: {worker_role}</Paragraph>

          {(createdAt && updatedAt) &&
            <View>
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
            <List.Subheader>Scheduled Surgeries</List.Subheader>
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
          resourceName='workers'
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
