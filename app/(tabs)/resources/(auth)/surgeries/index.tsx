import { NoResources } from '@/components/generic/NoResources'
import { SurgeryList } from '@/components/surgeries/SurgeryList'
import { useToken } from '@/hooks/useToken'
import {  Surgery } from '@/types/resources'
import { fetchAll } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([])
  const router = useRouter()
  const token = useToken()
  const path = '/resources/surgeries/create'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('surgeries', token)

        if (response) {

          console.log(response)
          setSurgeries(response)
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
      <Button onPress={e => router.push(path as never)}>Create</Button>
      {surgeries ? <SurgeryList surgeries={surgeries} /> : <NoResources resourceName='Surgeries' />}
    </ScrollView>
  )
}

export default index