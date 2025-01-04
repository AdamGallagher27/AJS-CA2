import { Surgery } from '@/types/resources'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper'

interface Props {
  surgery: Surgery
}

export const SurgeryCard = ({ surgery }: Props) => {
  const {
    _id,
    surgery_type,
    duration,
    room,
    is_deleted
  } = surgery

  if (is_deleted) {
    return
  }

  const router = useRouter()

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Surgery Type: {surgery_type}</Title>
        <Paragraph style={styles.subtitle}>Surgery Duration in Hours: {duration}</Paragraph>
      </Card.Content>
      {room && <View style={styles.infoRow}>
        <Chip style={styles.chip}>Room Type: {room.room_type}</Chip>
        <Chip style={styles.chip}>Room Number: {room.room_number}</Chip>
      </View>}
      <Card.Actions style={styles.actions}>
        <Button onPress={() => router.push(`/resources/surgeries/${_id}/show` as never)}>View Details</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginLeft: 16
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
  creator: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
  actions: {
    justifyContent: 'space-between',
  },
})
