import HospitalList from '@/components/hospitals/HospitalList'
import { useSession } from '@/contexts/AuthContext'
import { isAdmin } from '@/hooks/isAdmin'
import { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

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
    <ScrollView style={styles.container}>
      {isAdmin() && <Title style={styles.title}>Content you Created</Title>}
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