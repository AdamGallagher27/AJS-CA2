import { NoResources } from '@/components/generic/NoResources'
import { SurgeryList } from '@/components/surgeries/SurgeryList'
import { isAdmin } from '@/hooks/isAdmin'
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
  const createPath = '/resources/surgeries/create'
  const resourcesPath = '/resources'
  const admin = isAdmin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('surgeries', token)

        if (response) {
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
      {admin && <Button mode='contained' style={ {margin: 16}} onPress={e => router.push(createPath as never)}>Create</Button>}
      <Button mode='outlined' style={ {margin: 16}} onPress={() => router.push(resourcesPath as never)}>Back To Resources</Button> 
      {surgeries ? <SurgeryList surgeries={surgeries} /> : <NoResources resourceName='Surgeries' />}
    </ScrollView>
  )
}

export default index