import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

const index = () => {
  // will add hospitals type later
  const [hospitals, setHospitals] = useState<any[]>([])

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospitals')
        setHospitals(await response.json())
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchHospitals()
  }, [])

  return (
    <View>
      <Text>show all hospitals</Text>
      <Text>{hospitals && JSON.stringify(hospitals)}</Text>
    </View>
  )
}

export default index