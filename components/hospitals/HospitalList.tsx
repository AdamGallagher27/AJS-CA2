import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HospitalCard from './HospitalCard'
import NotFound from '../generic/NotFound'
import { Hospital } from '@/types/resources'

interface Props {
  hospitals: Hospital[]
}

const HospitalList = ({ hospitals }: Props) => {
  return (
    <View>
        <Text style={styles.title}>All Hospitals</Text>
        {hospitals && hospitals.length > 0 ? (
          hospitals.map((hospital: Hospital, index) => (
              <HospitalCard key={hospital?._id} hospital={hospital} />
          ))
        ) : (
          <NotFound resourceName='hospitals' />
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
  noHospitals: {
    fontSize: 14,
    color: '#666',
  },
})

export default HospitalList
