import { isAdmin } from '@/hooks/isAdmin'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import { NoResources } from '../generic/NoResources'
import { Room, Hospital } from '@/types/resources'
import { DeleteModal } from '../generic/DeleteModal'
import { useRouter } from 'expo-router'

type Props = {
  hospital: Hospital
}

export const ShowSingleHospital = ({ hospital }: Props) => {
  const {
    _id,
    title,
    city,
    daily_rate,
    number_of_departments,
    has_emergency_services,
    rooms,
    createdAt,
    updatedAt,
    is_deleted
  } = hospital

  if (is_deleted) {
    return <NoResources resourceName='Hospital' />
  }

  const admin = isAdmin()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const editPath = `/resources/hospitals/${_id}/edit`

  const onDismiss = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>Located in {city}</Paragraph>

          <View style={styles.margin}>
            <Chip style={styles.margin} >Daily Rate: ${daily_rate}</Chip>
            <Chip >Departments: {number_of_departments}</Chip>
          </View>

          <View style={styles.margin}>
            <Chip
              style={[
                has_emergency_services ? styles.emergencyChip : styles.noEmergencyChip,
              ]}
              icon={has_emergency_services ? 'check-circle' : 'close-circle'}
            >
              {has_emergency_services ? 'Emergency Services Available' : 'No Emergency Services'}
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

          {(rooms && rooms?.length > 0) && <List.Section>
            <List.Subheader>Available Rooms</List.Subheader>
            {rooms.map(({ _id, room_number, room_type }: Room) => (
              <List.Item
                key={_id}
                title={`Room Number : ${room_number}`}
                description={`Room Type : ${room_type}`}
              />
            ))}
          </List.Section>}

        </Card.Content>
      </Card>

      {admin &&
        <DeleteModal
          isVisible={showDeleteModal}
          onDismiss={onDismiss}
          resourceName='hospitals'
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
  emergencyChip: {
    backgroundColor: '#d4edda',
  },
  noEmergencyChip: {
    backgroundColor: '#f8d7da',
  },
})
