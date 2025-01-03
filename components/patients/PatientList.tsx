import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NoResources } from '../generic/NoResources'
import { Patient } from '@/types/resources'
import { PatientCard } from './PatientCard'

interface Props {
  patients: Patient[]
}

export const PatientList = ({ patients }: Props) => {
  return (
    <View>
      <Text style={styles.title}>All patients</Text>
      {patients && patients.length > 0 ? (
        patients.map((patient: Patient, index) => (
          <PatientCard key={patient?._id} patient={patient} />
        ))
      ) : (
        <NoResources resourceName='patients' />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noPatients: {
    fontSize: 14,
    color: '#666',
  },
})
