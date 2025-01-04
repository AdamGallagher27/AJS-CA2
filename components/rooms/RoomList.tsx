import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { HospitalCard } from './HospitalCard'
import { NoResources } from '../generic/NoResources'
import { Room } from '@/types/resources'
import { RoomCard } from './RoomCard'

interface Props {
  rooms: Room[]
}

export const RoomList = ({ rooms }: Props) => {
  return (
    <View>
      <Text style={styles.title}>All rooms</Text>
      {rooms && rooms.length > 0 ? (
        rooms.map((room: Room, index) => (
          <RoomCard key={room?._id} room={room} />
        ))
      ) : (
        <NoResources resourceName='rooms' />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  noRooms: {
    fontSize: 14,
    color: '#666',
  },
})
