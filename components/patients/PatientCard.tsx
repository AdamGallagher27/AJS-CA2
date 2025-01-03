import { Patient } from '@/types/resources'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper'

interface Props {
  patient: Patient
}

export const PatientCard = ({ patient }: Props) => {
  const {
    _id,
    last_name,
    condition,
    is_deleted
  } = patient

  if(is_deleted) {
    return
  }

  const router = useRouter()

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Patient Last Name: {last_name}</Title>
        <Paragraph style={styles.subtitle}>Condition: {condition}</Paragraph>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button onPress={() => router.push(`/resources/patients/${_id}/show` as never)}>View Details</Button>
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
