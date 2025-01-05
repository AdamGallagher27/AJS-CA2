import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Hospital, Room } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll } from '@/utils/api'
import { validateHospitalForm } from '@/utils/validation'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Switch, Button, List, Checkbox } from 'react-native-paper'

const initalFormState = {
  _id: '',
  title: '',
  city: '',
  daily_rate: 0,
  has_emergency_services: false,
  number_of_departments: 0,
}

const create = () => {
  const token = useToken()

  // state variable for the form
  const [form, setForm] = useState<Hospital>(initalFormState)

  // rooms from db
  const [allRooms, setAllRooms] = useState<Room[] | null>([])

  // rooms selected from the ui
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([])

  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>()

  const router = useRouter()
  const pathToAllHospitals = '/resources/hospitals'


  const handleSelectRoom = (room: Room) => {
    // this is from chat gpt because there was a bug where
    // if the room is prechecked it would get added twice
    setSelectedRooms((prev) =>
      prev.some((r) => r._id === room._id)
        ? prev.filter((r) => r._id !== room._id)
        : [...prev, room]
    )
  }

  useEffect(() => {
    const fetchRooms = async () => {
      if (token) {
        setAllRooms(await fetchAll('rooms', token))
      }
    }
    fetchRooms()
  }, [token])

  const create = async () => {
    // I need to omit the _id value which comes from the inital form state variable 
    // which causes a 422 error on the api
    // chatgpt
    const { _id, ...formWithoutId } = form as Hospital

    const body = {
      ...formWithoutId,
      rooms: getResourceIdsFromArray(selectedRooms),
    }

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/hospitals`, body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      if (response && response.data) {
        const resolved = await response.data
        const pathToShow = `/resources/hospitals/${resolved.data._id}/show`

        router.push(pathToShow as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }


  const handleSubmit = () => {
    if (validateHospitalForm(form, setErrors)) {
      create()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Hospital</Text>
      <FormError message={errors?.title} />
      <TextInput
        placeholder='Title'
        value={form?.title || ''}
        style={styles.input}
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
        value={String(form.daily_rate)}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState
              ? { ...prevState, daily_rate: Number(text) }
              : { ...initalFormState, daily_rate: Number(text) }
          )
        }
      />
      <FormError message={errors?.number_of_departments as string} />
      <TextInput
        placeholder='Number of Departments'
        value={String(form.number_of_departments)}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState
              ? { ...prevState, number_of_departments: Number(text) }
              : { ...initalFormState, number_of_departments: Number(text) }
          )
        }
      />
      {allRooms && (
        <List.Accordion title='Select Rooms'>
          {allRooms.map((room) => (
            <View key={room._id} style={styles.roomRow}>
              <Checkbox
                status={selectedRooms.some((r) => r._id === room._id) ? 'checked' : 'unchecked'}
                onPress={() => handleSelectRoom(room)}
              />
              <Text>{`${room.room_type} - Room ${room.room_number}`}</Text>
            </View>
          ))}
        </List.Accordion>
      )}
      <View style={styles.switchContainer}>
        <Text>Hospital has Emergency Services</Text>
        <Switch
          value={form.has_emergency_services}
          onValueChange={(input) =>
            setForm((prevState) =>
              prevState
                ? { ...prevState, has_emergency_services: input }
                : { ...initalFormState, has_emergency_services: input }
            )
          }
        />
      </View>
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Create
      </Button>
      <Button mode='outlined' onPress={() => router.push(pathToAllHospitals)} style={styles.button}>
        Back To Hospitals
      </Button>
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

export default create
