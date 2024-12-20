import NotFound from '@/components/generic/NotFound'
import ShowSingleHospital from '@/components/hospitals/ShowSingleHospital'
import { Hospital } from '@/types/resources'
import { fetchHospitalById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const ShowHospital = () => {
  const [hospital, setHospital] = useState<Hospital>()
  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchHospitalById(id)

        if(response) {
          setHospital(response)
        }
      }
      catch(error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <View>
      {hospital ? <ShowSingleHospital hospital={hospital} /> : <NotFound resourceName='Hospital'  />}
    </View>
  )
}

export default ShowHospital