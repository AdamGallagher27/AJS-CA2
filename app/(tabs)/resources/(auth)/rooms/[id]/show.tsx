import { NoResources } from '@/components/generic/NoResources'
import { ShowSingleRoom } from '@/components/rooms/ShowSingleRoom'
import { useToken } from '@/hooks/useToken'
import { Room } from '@/types/resources'
import { fetchById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const show = () => {
  const [room, setRoom] = useState<Room>()
  const { id } = useLocalSearchParams<{ id: string }>()
  const token = useToken()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchById('rooms', id, token)

        if (response) {

          console.log(response)

          setRoom(response)
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [token])

  return (
    <View>
      {room ? <ShowSingleRoom room={room} /> : <NoResources resourceName='Room' />}
    </View>
  )
}

export default show