import { useState } from 'react'
import { View, Text, TextInput, Switch, Button } from 'react-native'

const create = () => {

  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…zczfQ.P4BBkkuPI0DZF6tu3txLvNWW7gWPF8n9juh3YgnSypY'

  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [dailyRate, setDailyRate] = useState('')
  const [numberOfDepartments, setNumberOfDepartments] = useState('')
  const [hasEmergencyServices, setHasEmergencyServices] = useState(false)

  //   {
  //     "has_emergency_services": true,
  //     "number_of_departments": 12,
  //     "daily_rate": 1500,
  //     "city": "Dubllin",
  //     "title": "Delete me in postman"
  //     // "fdlskfj": true
  // }

  // const register = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/users/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ full_name: fullname, email, password })
  //     })

  //     if(response.ok) {
  //       console.log(await response.json())
  //     }
  //   }
  //   catch(error) {
  //     console.error(error)
  //   }
  // }


  const create = async () => {

    console.log(JSON.stringify({ title, city, daily_rate: dailyRate, number_of_departments: numberOfDepartments, has_emergency_services: hasEmergencyServices }))


    try {
      const response = await fetch('http://localhost:5000/api/hospitals', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${testToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, city, daily_rate: dailyRate, number_of_departments: numberOfDepartments, has_emergency_services: hasEmergencyServices })
      })


      if (response.ok) {
        console.log(await response.json())
      }
    }
    catch (error) {

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

export default create