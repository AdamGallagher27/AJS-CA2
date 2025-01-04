import { NoResources } from '@/components/generic/NoResources'
import { HospitalList } from '@/components/hospitals/HospitalList'
import { isAdmin } from '@/hooks/isAdmin'
import { Hospital } from '@/types/resources'
import { fetchAll } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const router = useRouter()
  const path = '/resources/hospitals/create'

  const admin = isAdmin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('hospitals')

        if (response) {
          setHospitals(response)
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView>
      {admin && <Button mode='contained' style={ {margin: 16}} onPress={e => router.push(path)}>Create</Button>}
      {hospitals ? <HospitalList hospitals={hospitals} /> : <NoResources resourceName='hospitals' />}
    </ScrollView>
  )
}

export default index