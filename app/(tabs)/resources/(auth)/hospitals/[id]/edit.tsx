import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Hospital, Room } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll, fetchById } from '@/utils/api'
import { validateHospitalForm } from '@/utils/validation'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput, Switch, Button, Checkbox, List } from 'react-native-paper'

const initalFormState = {
  _id: '',
  title: '',
  city: '',
  daily_rate: 0,
  has_emergency_services: false,
  number_of_departments: 0,
}

const edit = () => {
  const router = useRouter()
  const token = useToken()
  const userId = useUserId()
  const { id } = useLocalSearchParams<{ id: string }>()

  // state variable for the form
  const [form, setForm] = useState<Hospital | null>(initalFormState)

  // rooms from db
  const [allRooms, setAllRooms] = useState<Room[] | null>([])

  // rooms selected from the ui
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([])

  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>()

  const pathToShowSingleHospital = `/resources/hospitals/${id}/show`

  const handleSelectRoom = (room: Room) => {

    // this is from chat gpt because there was a bug where
    // if the room is prechecked it would get added twice
    setSelectedRooms((prev) =>
      prev.some((r) => r._id === room._id)
        ? prev.filter((r) => r._id !== room._id)
        : [...prev, room]
    )
  }

  // get selected hospitals and all rooms for drop down
  useEffect(() => {
    const fetchRooms = async () => {
      if (token) {
        setAllRooms(await fetchAll('rooms', token))
      }
    }

    const fetchSelectedHospital = async () => {

      let hospital

      if (id) {
        hospital = await fetchById('hospitals', id)
        setForm(hospital)
      }

      // if the hospital has rooms preselect those rooms in the form
      if (hospital && hospital.rooms) {
        setSelectedRooms(hospital.rooms)
      }
    }

    fetchRooms()
    fetchSelectedHospital()

  }, [id, token])

  const edit = async () => {

    const body = { ...form, created_by: userId, rooms: getResourceIdsFromArray(selectedRooms) }

    try {
      const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/api/hospitals/${id}`, body, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      if (response) {
        router.push(`/resources/hospitals/${id}/show` as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (validateHospitalForm(form, setErrors)) {
      edit()
    }
  }

  // add loading 
  if (!form) return null
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Hospital</Text>
      <FormError message={errors?.title} />
      <TextInput
        placeholder='Title'
        value={form.title}
        style={styles.input}
        // I need to ensure that this field is not null after the api request so I use the inital form state as a fallback
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, title: text } : { ...initalFormState, title: text }
          )
        }
      />
      <FormError message={errors?.city} />
      <TextInput
        placeholder='City'
        value={form.city}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, city: text } : { ...initalFormState, city: text }
          )
        }
      />
      <FormError message={errors?.daily_rate as string} />
      <TextInput
        placeholder='Daily Rate'
        keyboardType='numeric'
        style={styles.input}
        value={form.daily_rate as string}
        onChangeText={(text) => setForm(prevState => (prevState ? { ...prevState, daily_rate: text } : { ...initalFormState, daily_rate: text }))}
      />
      <FormError message={errors?.number_of_departments as string} />
      <TextInput
        placeholder='Number of Departments'
        keyboardType='numeric'
        style={styles.input}
        value={form.number_of_departments as string}
        onChangeText={(text) => setForm(prevState => (prevState ? { ...prevState, number_of_departments: text } : { ...initalFormState, number_of_departments: text }))}
      />
      {allRooms && <List.Accordion title='Rooms'>
        {allRooms.map((room) => (
          <View key={room._id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
            <Checkbox
              status={(selectedRooms.some((r) => r._id === room._id)) ? 'checked' : 'unchecked'}
              onPress={() => handleSelectRoom(room)}
            />
            <Text>{`${room.room_type} - Room ${room.room_number}`}</Text>
          </View>
        ))}
      </List.Accordion>}
      <View style={styles.switchContainer}>
        <Text>Hospital has Emergency Services</Text>
        <Switch
          value={form.has_emergency_services}
          onValueChange={(input) => setForm(prevState => (prevState ? { ...prevState, has_emergency_services: input } : { ...initalFormState, has_emergency_services: input }))}
        />
      </View>
      <Button mode='contained' style={styles.button} onPress={handleSubmit}>Edit</Button>
      <Button mode='outlined' style={styles.button} onPress={() => router.push(pathToShowSingleHospital as never)}>Back To Hospitals</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 15,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
})

export default edit