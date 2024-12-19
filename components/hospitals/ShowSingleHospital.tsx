import { isAdmin } from '@/hooks/isAdmin'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, List, Paragraph, Title } from 'react-native-paper'
import NotFound from '../generic/NotFound'
import { Room, Hospital } from '@/types/resources'

type Props = {
  hospital: Hospital
}

const ShowSingleHospital = ({ hospital }: Props) => {
  const {
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


  if(is_deleted) {
    return <NotFound resourceName='Hospital' />
  }

  const admin = isAdmin()

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.subtitle}>Located in {city}</Paragraph>

        <View style={styles.infoRow}>
          <Chip style={styles.chip}>Daily Rate: ${daily_rate}</Chip>
          <Chip style={styles.chip}>Departments: {number_of_departments}</Chip>
        </View>

        <View style={styles.infoRow}>
          <Chip
            style={[
              styles.chip,
              has_emergency_services ? styles.emergencyChip : styles.noEmergencyChip,
            ]}
            icon={has_emergency_services ? 'check-circle' : 'close-circle'}
          >
            {has_emergency_services ? 'Emergency Services Available' : 'No Emergency Services'}
          </Chip>
        </View>
        <View>
          <Paragraph>Created At: {new Date(createdAt).toLocaleString()}</Paragraph>
          <Paragraph>Updated At: {new Date(updatedAt).toLocaleString()}</Paragraph>
        </View>

        {admin &&
          <View>
            <Button onPress={() => console.log('edit')}>Edit</Button>
            <Button onPress={() => console.log('delete')}>Delete</Button>
          </View>
        }


        {rooms && <List.Section>
          <List.Subheader style={styles.subtitle}>Available Rooms</List.Subheader>
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
  )


}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  emergencyChip: {
    backgroundColor: '#d4edda',
  },
  noEmergencyChip: {
    backgroundColor: '#f8d7da',
  },
  activeChip: {
    backgroundColor: '#cce5ff',
  },
  deletedChip: {
    backgroundColor: '#f5c6cb',
  },
  metaText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
})

export default ShowSingleHospital