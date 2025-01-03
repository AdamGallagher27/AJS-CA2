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

          <View>
            <Chip >Daily Rate: ${daily_rate}</Chip>
            <Chip >Departments: {number_of_departments}</Chip>
          </View>

          <View>
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
            <View>
              <Button onPress={() => router.push(editPath as never)}>Edit</Button>
              <Button onPress={() => setShowDeleteModal(true)}>Delete</Button>
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
  emergencyChip: {
    backgroundColor: '#d4edda',
  },
  noEmergencyChip: {
    backgroundColor: '#f8d7da',
  },
})
