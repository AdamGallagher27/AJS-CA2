import { NoResources } from '@/components/generic/NoResources'
import { RoomList } from '@/components/rooms/RoomList'
import { isAdmin } from '@/hooks/isAdmin'
import { useToken } from '@/hooks/useToken'
import { Room } from '@/types/resources'
import { fetchAll } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const router = useRouter()
  const token = useToken()
  const path = '/resources/rooms/create'
  const admin = isAdmin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('rooms', token)

        if (response) {
          setRooms(response)
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [token])

  return (
    <ScrollView>
      {admin && <Button mode='contained' style={{ margin: 16 }} onPress={e => router.push(path as never)}>Create</Button>}
      {rooms ? <RoomList rooms={rooms} /> : <NoResources resourceName='rooms' />}
    </ScrollView>
  )
}

export default index