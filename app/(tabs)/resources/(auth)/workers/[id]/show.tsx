import { NoResources } from '@/components/generic/NoResources'
import { ShowSingleWorker } from '@/components/workers/ShowSingleWorker'
import { useToken } from '@/hooks/useToken'
import { Worker } from '@/types/resources'
import { fetchById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const show = () => {
  const [worker, setWorker] = useState<Worker>()
  const { id } = useLocalSearchParams<{ id: string }>()
  const token = useToken()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchById('workers', id, token)

        if (response) {
          setWorker(response)
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
      {worker ? <ShowSingleWorker worker={worker} /> : <NoResources resourceName='Worker' />}
    </View>
  )
}

export default show