import { NoResources } from '@/components/generic/NoResources'
import { ShowSingleSurgery } from '@/components/surgeries/ShowSingleSurgery'
import { useToken } from '@/hooks/useToken'
import { Surgery } from '@/types/resources'
import { fetchById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const show = () => {
  const [surgery, setSurgery] = useState<Surgery>()
  const { id } = useLocalSearchParams<{ id: string }>()
  const token = useToken()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchById('surgeries', id, token)

        if (response) {

          console.log(response)

          setSurgery(response)
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
      {surgery ? <ShowSingleSurgery surgery={surgery} /> : <NoResources resourceName='Surgery' />}
    </View>
  )
}

export default show