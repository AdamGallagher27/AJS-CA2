import { NoResources } from '@/components/generic/NoResources'
import { PatientList } from '@/components/patients/PatientList'
import { isAdmin } from '@/hooks/isAdmin'
import { useToken } from '@/hooks/useToken'
import {  Patient } from '@/types/resources'
import { fetchAll } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const router = useRouter()
  const token = useToken()
  const path = '/resources/patients/create'
  const admin = isAdmin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAll('patients', token)

        if (response) {

          setPatients(response)
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
      {admin && <Button mode='contained' style={ {margin: 16}} onPress={e => router.push(path as never)}>Create</Button>}
      {patients ? <PatientList patients={patients} /> : <NoResources resourceName='patients' />}
    </ScrollView>
  )
}

export default index