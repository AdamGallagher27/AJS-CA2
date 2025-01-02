import UserContent from '@/components/generic/UserContent'
import HospitalList from '@/components/hospitals/HospitalList'
import { isAdmin } from '@/hooks/isAdmin'
import { useToken } from '@/hooks/useToken'
import { Hospital, UserResources } from '@/types/resources'
import { fetchAll, fetchUserCreatedResources } from '@/utils/api'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

const index = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [userResources, setUserResources] = useState<UserResources>()

  const admin = isAdmin()
  const token = useToken()

  useEffect(() => {

    const fetchCreatedResources = async (token: string) => {
      try {
        const response = await fetchUserCreatedResources(token)

        if(response) {
          setUserResources(response)
        }
      }
      catch(error) {
        console.error(error)
      }
    }

    const fetchHospital = async () => {
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

    if(admin) {
      fetchCreatedResources(token)
    }

    fetchHospital()

  }, [token, admin])

  return (
    <ScrollView style={styles.container}>
      {admin && 
      <>
        <Title style={styles.title}>Content you Created</Title>
        {userResources && <UserContent userResouces={userResources} />}
      </>
      }
      {hospitals && <HospitalList hospitals={hospitals} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noHospitals: {
    fontSize: 14,
    color: '#666',
  },
})

export default index