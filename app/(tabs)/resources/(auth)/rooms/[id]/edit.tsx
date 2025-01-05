import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Hospital, Room, Surgery } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll, fetchById } from '@/utils/api'
import { validateRoomForm } from '@/utils/validation'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Switch, Button, List, Checkbox } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

const initalFormState = {
  _id: '',
  room_number: '',
  room_type: '',
  daily_rate: '',
  availability_status: false,
}

const update = () => {
  const token = useToken()
  const userId = useUserId()
  const { id } = useLocalSearchParams<{ id: string }>()

  // state variable for the form
  const [form, setForm] = useState<Room>(initalFormState)

  // surgeries from db
  const [allSurgeries, setAllSurgeries] = useState<Surgery[] | null>([])

  // surgeries selected from the ui
  const [selectedSurgeries, setSelectedSurgeries] = useState<Surgery[]>([])

  const [allHospitals, setAllHospitals] = useState<Hospital[]>([])

  const [selectedHospital, setSelectedHospital] = useState<string>()


  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>(null)

  const router = useRouter()
  const pathToAllRooms = '/resources/rooms'


  const handleSelectSurgeries = (surgery: Surgery) => {
    // this is from chat gpt because there was a bug where
    // if the surgery is prechecked it would get added twice
    setSelectedSurgeries((prev) =>
      prev.some((r) => r._id === surgery._id)
        ? prev.filter((r) => r._id !== surgery._id)
        : [...prev, surgery]
    )
  }

  useEffect(() => {

    // get all hospitals
    // Im passing in the room object so if it has a 
    // hospital in it the form can preselect it
    // else it will just use the first in the list of all hospitals
    const fetchHospitals = async (room: Room) => {
      if (token) {
        const hospitals = await fetchAll('hospitals', token)
        setAllHospitals(hospitals)
      }

      if(room.hospital) {
        setSelectedHospital(room.hospital._id)
      }
      else {
        setSelectedHospital(allHospitals[0]._id)
      }

    }

    const fetchRoom = async () => {

      let room

      if(token) {
        room = await fetchById('rooms', id, token)
        setForm(room)

        // get the hospitals and preselect the hospital if its in the room object
        fetchHospitals(room)
      }

      if(room && room.surgeries) {
        setSelectedSurgeries(room.surgeries)
      }
    }

    const fetchSurgeries = async () => {
      if (token) {
        setAllSurgeries(await fetchAll('surgeries', token))
      }
    }

    fetchRoom()
    fetchSurgeries()
  }, [token])

  const update = async () => {

    const body = {
      ...form,
      hospital: selectedHospital,
      
      surgeries: getResourceIdsFromArray(selectedSurgeries),
    }

    try {
      const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/api/rooms/${id}`, body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      if (response && response.data) {
        const resolved = await response.data
        const pathToShow = `/resources/rooms/${resolved._id}/show`

        router.push(pathToShow as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (validateRoomForm(form, setErrors)) {
      update()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update New Room</Text>
      <FormError message={errors?.room_type} />
      <TextInput
        placeholder='Room Type'
        value={form?.room_type}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, room_type: text } : { ...initalFormState, room_type: text }
          )
        }
      />
      <FormError message={errors?.room_number as string} />
      <TextInput
        placeholder='Room Number'
        value={String(form.room_number)}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState
              ? { ...prevState, room_number: Number(text) }
              : { ...initalFormState, room_number: Number(text) }
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
      {allSurgeries && (
        <List.Accordion title='Select Surgeries'>
          {allSurgeries.map((surgery) => (
            <View key={surgery._id} style={styles.surgeryRow}>
              <Checkbox
                status={selectedSurgeries.some((s) => s._id === surgery._id) ? 'checked' : 'unchecked'}
                onPress={() => handleSelectSurgeries(surgery)}
              />
              <Text>{`${surgery.surgery_type} - Room ${surgery.date}`}</Text>
            </View>
          ))}
        </List.Accordion>
      )}
      {allHospitals && <View>
        <Picker
          selectedValue={selectedHospital}
          onValueChange={(hospitalId: string) => setSelectedHospital(hospitalId)}
          style={styles.picker}
        >
          {allHospitals.map(({ _id, title }: Hospital) => {
            return <Picker.Item key={_id} label={title} value={_id} />
          })}
        </Picker>
      </View>}

      <View style={styles.switchContainer}>
        <Text>Room is Available</Text>
        <Switch
          value={form.availability_status}
          onValueChange={(input) =>
            setForm((prevState) =>
              prevState
                ? { ...prevState, availability_status: input }
                : { ...initalFormState, availability_status: input }
            )
          }
        />
      </View>
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        update
      </Button>
      <Button mode='outlined' onPress={() => router.push(pathToAllRooms)} style={styles.button}>
        Back To Rooms
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 'auto',
    marginTop: 16
  },
  selected: {
    marginTop: 16,
    fontSize: 16,
  },
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
  surgeryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
})

export default update
