import NotFound from '@/components/generic/NotFound'
import HospitalList from '@/components/hospitals/HospitalList'
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('hospitals')

        if(response) {
          setHospitals(response)
        }
      }
      catch(error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView>
      <Button onPress={e => router.push(path)}>Create</Button>
      {hospitals ? <HospitalList hospitals={hospitals} /> : <NotFound resourceName='hospitals' />}
    </ScrollView>
  )
}

export default index