import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { HospitalCard } from './HospitalCard'
import { NoResources } from '../generic/NoResources'
import { Worker } from '@/types/resources'
import { WorkerCard } from './WorkerCard'

interface Props {
  workers: Worker[]
}

export const WorkerList = ({ workers }: Props) => {
  return (
    <View>
      <Text style={styles.title}>All workers</Text>
      {workers && workers.length > 0 ? (
        workers.map((worker: Worker, index) => (
          <WorkerCard key={worker?._id} worker={worker} />
        ))
      ) : (
        <NoResources resourceName='workers' />
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
  noWorkers: {
    fontSize: 14,
    color: '#666',
  },
})
