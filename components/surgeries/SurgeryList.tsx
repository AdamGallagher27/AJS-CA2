import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NoResources } from '../generic/NoResources'
import { Surgery } from '@/types/resources'
import { SurgeryCard } from './SurgeryCard'

interface Props {
  surgeries: Surgery[]
}

export const SurgeryList = ({ surgeries }: Props) => {
  return (
    <View>
      <Text style={styles.title}>All surgeries</Text>
      {surgeries && surgeries.length > 0 ? (
        surgeries.map((surgery: Surgery, index) => (
          <SurgeryCard key={surgery?._id} surgery={surgery} />
        ))
      ) : (
        <NoResources resourceName='Surgeries' />
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
  noSurgerys: {
    fontSize: 14,
    color: '#666',
  },
})
