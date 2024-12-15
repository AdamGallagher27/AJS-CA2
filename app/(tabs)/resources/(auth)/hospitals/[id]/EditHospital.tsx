import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { useState } from 'react'
import { View, Text, TextInput, Switch, Button } from 'react-native'

const EditHospital = () => {

  const token = useToken()
  const userId = useUserId()
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [dailyRate, setDailyRate] = useState('')
  const [numberOfDepartments, setNumberOfDepartments] = useState('')
  const [hasEmergencyServices, setHasEmergencyServices] = useState(false)

  // get all rooms aswell

  // get all hospitals

  const create = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/hospitals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, city, daily_rate: dailyRate, number_of_departments: numberOfDepartments, has_emergency_services: hasEmergencyServices, created_by: userId })
      })

      if (response.ok) {
        console.log(await response.json())
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <Text>Create new hospital</Text>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder='City'
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        placeholder='Daily Rate'
        value={dailyRate}
        onChangeText={setDailyRate}
      />
      <TextInput
        placeholder='Number of Departments'
        value={numberOfDepartments}
        onChangeText={setNumberOfDepartments}
      />
      <Text>Hospital has Emergency Servvices</Text>
      <Switch
        value={hasEmergencyServices}
        onValueChange={setHasEmergencyServices}
      />
      <Button title='Create' onPress={create} />
    </View>
  )
}

export default EditHospital