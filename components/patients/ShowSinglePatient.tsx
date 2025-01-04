import { isAdmin } from '@/hooks/isAdmin'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import { NoResources } from '../generic/NoResources'
import { Patient, Surgery } from '@/types/resources'
import { DeleteModal } from '../generic/DeleteModal'
import { useRouter } from 'expo-router'

type Props = {
  patient: Patient
}

export const ShowSinglePatient = ({ patient }: Props) => {
  const {
    _id,
    first_name,
    last_name,
    insurance,
    age,
    condition,
    surgeries,
    createdAt,
    updatedAt,
    is_deleted
  } = patient

  if (is_deleted) {
    return <NoResources resourceName='Patient' />
  }

  const admin = isAdmin()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const editPath = `/resources/patients/${_id}/edit`

  const onDismiss = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card>
        <Card.Content>
          <Title>Patient Name: {first_name} {last_name}</Title>
          <Paragraph>Age: {age}</Paragraph>
          <Paragraph>Condition: {condition}</Paragraph>
          <View>
            <Chip
              style={[
                insurance ? styles.available : styles.notAvailable,
              ]}
              icon={insurance ? 'check-circle' : 'close-circle'}
            >
              {insurance ? 'Patient has Insurrance' : 'Patient does not have Insurance'}
            </Chip>
          </View>

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
            <List.Subheader>Patients Scheduled Surgeries</List.Subheader>
            {surgeries.map(({ _id, surgery_type, duration }: Surgery) => (
              <List.Item
                key={_id}
                title={`Surgery Type: ${surgery_type}`}
                description={`Duration in hours: ${duration}`}
              />
            ))}
          </List.Section>}
        </Card.Content>
      </Card>

      {admin &&
        <DeleteModal
          isVisible={showDeleteModal}
          onDismiss={onDismiss}
          resourceName='patients'
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
  available: {
    backgroundColor: '#d4edda',
  },
  notAvailable: {
    backgroundColor: '#f8d7da',
  },
})
