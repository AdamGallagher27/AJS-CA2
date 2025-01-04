import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Patient, Room, Surgery, Worker } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll } from '@/utils/api'
import { validateSurgeryForm } from '@/utils/validation'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Switch, Button, List, Checkbox } from 'react-native-paper'
import { ScrollView } from 'react-native'

const initalFormState = {
  _id: '',
  surgery_type: '',
  date: '',
  duration: '',
}

const create = () => {
  const token = useToken()
  const userId = useUserId()

  // state variable for the form
  const [form, setForm] = useState<Surgery>(initalFormState)

  // workers from db
  const [allWorkers, setAllWorkers] = useState<Worker[] | null>([])

  // workers selected from the ui
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([])

  // rooms state variablse for drop down
  const [allRooms, setAllRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>()

  const [allPatients, setAllPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string>()

  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>()

  const router = useRouter()
  const pathToAllSurgeries = '/resources/surgeries'


  const handleSelectWorker = (worker: Worker) => {
    // this is from chat gpt because there was a bug where
    // if the worker is prechecked it would get added twice
    setSelectedWorkers((prev) =>
      prev.some((r) => r._id === worker._id)
        ? prev.filter((r) => r._id !== worker._id)
        : [...prev, worker]
    )
  }

  useEffect(() => {

    const fetchRooms = async () => {
      if (token) {
        const rooms = await fetchAll('rooms', token)
        setAllRooms(rooms)
        setSelectedRoom(rooms[0]._id)

      }
    }

    const fetchWorkers = async () => {
      if (token) {
        setAllWorkers(await fetchAll('workers', token))
      }
    }

    const fetchPatients = async () => {
      if (token) {
        const patients = await fetchAll('patients', token)
        setAllPatients(patients)
        setSelectedPatient(patients[0]._id)

      }
    }

    fetchRooms()
    fetchWorkers()
    fetchPatients()
  }, [token])

  const create = async () => {
    // I need to omit the _id value which comes from the inital form state variable 
    // which causes a 422 error on the api
    // chatgpt
    const { _id, ...formWithoutId } = form as Surgery

    const body = {
      ...formWithoutId,
      created_by: userId,
      workers: getResourceIdsFromArray(selectedWorkers),
      room: selectedRoom,
      patient: selectedPatient
    }

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/surgeries`, body,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })

      if (response && response.data) {
        const resolved = await response.data
        const pathToShow = `/resources/surgeries/${resolved.data._id}/show`

        router.push(pathToShow as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (validateSurgeryForm(form, setErrors)) {
      create()
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Create New Surgery</Text>
        <FormError message={errors?.surgery_type} />
        <TextInput
          placeholder='Surgery Type'
          value={form?.surgery_type}
          style={styles.input}
          onChangeText={(text) =>
            setForm((prevState) =>
              prevState ? { ...prevState, surgery_type: text } : { ...initalFormState, surgery_type: text }
            )
          }
        />
        <FormError message={errors?.date} />
        <TextInput
          placeholder='Date'
          value={form.date}
          style={styles.input}
          onChangeText={(text) =>
            setForm((prevState) =>
              prevState ? { ...prevState, date: text } : { ...initalFormState, date: text }
            )
          }
        />
        <FormError message={errors?.duration as string} />
        <TextInput
          placeholder='Daily Rate'
          value={String(form.duration)}
          style={styles.input}
          onChangeText={(text) =>
            setForm((prevState) =>
              prevState
                ? { ...prevState, duration: Number(text) }
                : { ...initalFormState, duration: Number(text) }
            )
          }
        />
        {allWorkers && (
          <List.Accordion title='Select Workers'>
            {allWorkers.map((worker) => (
              <View key={worker._id} style={styles.workerRow}>
                <Checkbox
                  status={selectedWorkers.some((r) => r._id === worker._id) ? 'checked' : 'unchecked'}
                  onPress={() => handleSelectWorker(worker)}
                />
                <Text>{`${worker.worker_role} - Worker ${worker.last_name}`}</Text>
              </View>
            ))}
          </List.Accordion>
        )}

        {allRooms && <View style={styles.dropDownContainer}>
          <Picker
            selectedValue={selectedRoom}
            onValueChange={(roomId: string) => setSelectedRoom(roomId)}
            style={styles.picker}
          >
            {allRooms.map(({ _id, room_number }: Room) => {
              return <Picker.Item key={_id} label={String(room_number)} value={_id} />
            })}
          </Picker>
        </View>}

        {allPatients && <View style={styles.dropDownContainer}>
          <Picker
            selectedValue={selectedPatient}
            onValueChange={(patientId: string) => setSelectedPatient(patientId)}
            style={styles.picker}
          >
            {allPatients.map(({ _id, last_name }: Patient) => {
              return <Picker.Item key={_id} label={last_name} value={_id} />
            })}
          </Picker>
        </View>}

        <Button mode='contained' onPress={handleSubmit} style={styles.button}>
          Create
        </Button>
        <Button mode='outlined' onPress={() => router.push(pathToAllSurgeries)} style={styles.button}>
          Back To Surgeries
        </Button>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  dropDownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 200,
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
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
})

export default create
