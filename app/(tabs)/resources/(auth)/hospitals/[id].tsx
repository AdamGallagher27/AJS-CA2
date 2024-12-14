import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

const show = () => {
  // will add hospital type later
  const [hospital, setHospital] = useState<any>()
  const testId = '67376f0e2fe6ab238dbbdc5c'

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hospitals/${testId}`)
        setHospital(await response.json())
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchHospitals()
  }, [])

  return (
    <View>
      <Text>show one hospital</Text>
      <Text>{hospital && JSON.stringify(hospital)}</Text>
    </View>
  )
}

export default show