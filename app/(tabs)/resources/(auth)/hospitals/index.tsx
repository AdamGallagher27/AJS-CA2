import NotFound from '@/components/generic/NotFound'
import HospitalList from '@/components/hospitals/HospitalList'
import { Hospital } from '@/types/resources'
import { fetchAllHospitals } from '@/utils/api'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

const index = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllHospitals()

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
      {hospitals ? <HospitalList hospitals={hospitals} /> : <NotFound resourceName='hospitals' />}
    </ScrollView>
  )
}

export default index