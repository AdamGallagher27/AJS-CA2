import HospitalList from '@/components/hospitals/HospitalList'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

const index = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/hospitals`)
        setHospitals(await response.json())
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchHospitals()
  }, [])

  return (
    <ScrollView>
      {hospitals && <HospitalList hospitals={hospitals} />}
    </ScrollView>
  )
}

export default index