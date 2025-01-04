import { NoResources } from '@/components/generic/NoResources'
import { ShowSinglePatient } from '@/components/patients/ShowSinglePatient'
import { useToken } from '@/hooks/useToken'
import { Patient } from '@/types/resources'
import { fetchById } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { View } from 'react-native'

const show = () => {
  const [patient, setPatient] = useState<Patient>()
  const { id } = useLocalSearchParams<{ id: string }>()
  const token = useToken()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchById('patients', id, token)

        if (response) {

          setPatient(response)
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
      {patient ? <ShowSinglePatient patient={patient} /> : <NoResources resourceName='Patient' />}
    </View>
  )
}

export default show