import { NoResources } from '@/components/generic/NoResources'
import { WorkerList } from '@/components/workers/WorkerList'
import { isAdmin } from '@/hooks/isAdmin'
import { useToken } from '@/hooks/useToken'
import {  Worker } from '@/types/resources'
import { fetchAll } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const [workers, setWorkers] = useState<Worker[]>([])
  const router = useRouter()
  const token = useToken()
  const createPath = '/resources/workers/create'
  const resourcesPath = '/resources'
  const admin = isAdmin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('workers', token)

        if (response) {
          setWorkers(response)
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
      <Button mode='outlined' style={ {margin: 16}} onPress={() => router.push(resourcesPath as never)}>Back to Resources</Button>
      {workers ? <WorkerList workers={workers} /> : <NoResources resourceName='workers' />}
    </ScrollView>
  )
}

export default index