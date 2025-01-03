import { NoResources } from '@/components/generic/NoResources'
import { ShowSingleHospital } from '@/components/hospitals/ShowSingleHospital'
import { Hospital } from '@/types/resources'
import { fetchById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const show = () => {
  const [hospital, setHospital] = useState<Hospital>()
  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchById('hospitals', id)

        if (response) {
          setHospital(response)
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <View>
      {hospital ? <ShowSingleHospital hospital={hospital} /> : <NoResources resourceName='Hospital' />}
    </View>
  )
}

export default show