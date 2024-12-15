import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper'

interface Props {
  hospital: Hospital
}

const HospitalCard = ({ hospital }: Props) => {
  const {
    // _id,
    title,
    city,
    daily_rate,
    number_of_departments,
    has_emergency_services,
  } = hospital


  // const navigation = useNavigation()
  // const currentRoute = useRoute()

  // const navigateToView = () => {
  //   const path = currentRoute.name

  // }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.subtitle}>City: {city}</Paragraph>

        <View style={styles.infoRow}>
          <Chip style={styles.chip}>Daily Rate: ${daily_rate}</Chip>
          <Chip style={styles.chip}>Departments: {number_of_departments}</Chip>
        </View>

        <View style={styles.infoRow}>
          <Chip
            style={[styles.chip, has_emergency_services ? styles.emergencyChip : styles.noEmergencyChip]}
            icon={has_emergency_services ? 'check-circle' : 'close-circle'}
          >
            {has_emergency_services ? 'Emergency Services Available' : 'No Emergency Services'}
          </Chip>
        </View>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button onPress={() => console.log('View Details Clicked')}>View Details</Button>
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

export default HospitalCard