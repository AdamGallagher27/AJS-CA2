import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Worker, Surgery } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll, fetchById } from '@/utils/api'
import { validateWorkerForm } from '@/utils/validation'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, List, Checkbox } from 'react-native-paper'

const initalFormState = {
  _id: '',
  first_name: '',
  last_name: '',
  worker_role: '',
}

const create = () => {
  const token = useToken()
  const userId = useUserId()
  const { id } = useLocalSearchParams<{ id: string }>()

  // state variable for the form
  const [form, setForm] = useState<Worker>(initalFormState)

  // surgeries from db
  const [allSurgeries, setAllSurgeries] = useState<Surgery[] | null>([])

  // surgeries selected from the ui
  const [selectedSurgeries, setSelectedSurgeries] = useState<Surgery[]>([])

  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>()

  const router = useRouter()
  const pathToAllWorkers = '/resources/workers'

  const handleSelectSurgery = (surgery: Surgery) => {
    // this is from chat gpt because there was a bug where
    // if the room is prechecked it would get added twice
    setSelectedSurgeries((prev) =>
      prev.some((s) => s._id === surgery._id)
        ? prev.filter((s) => s._id !== surgery._id)
        : [...prev, surgery]
    )
  }

  useEffect(() => {

    const fetchSurgeries = async (worker: Worker) => {
      if (token) {
        setAllSurgeries(await fetchAll('surgeries', token))
      }

      if(worker.surgeries) {
        setSelectedSurgeries(worker.surgeries)
      }
    }

    const fetchWorker = async () => {

      let worker

      if(token) {
        worker = await fetchById('workers', id, token)
        setForm(worker)

        fetchSurgeries(worker)
      }
    }

    
    fetchWorker()
  }, [token])

  const update = async () => {

    const body = await {
      ...form,
      
      surgeries: getResourceIdsFromArray(selectedSurgeries),
    }

    try {
      const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/api/workers/${id}`, body, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
      },
        
      })

      if (response && response.data) {
        const pathToShow = `/resources/workers/${id}/show`

        router.push(pathToShow as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (validateWorkerForm(form, setErrors)) {
      update()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Worker</Text>
      <FormError message={errors?.first_name} />
      <TextInput
        placeholder='First Name'
        value={form?.first_name}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, first_name: text } : { ...initalFormState, first_name: text }
          )
        }
      />
      <FormError message={errors?.last_name} />
      <TextInput
        placeholder='Last Name'
        value={form.last_name}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, last_name: text } : { ...initalFormState, last_name: text }
          )
        }
      />
      <FormError message={errors?.worker_role} />
      <TextInput
        placeholder='Worker Job Title'
        value={form.worker_role}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, worker_role: text } : { ...initalFormState, worker_role: text }
          )
        }
      />
      {allSurgeries && (
        <List.Accordion title='Select Surgeries'>
          {allSurgeries.map((surgery) => (
            <View key={surgery._id} style={styles.surgeryRow}>
              <Checkbox
                status={selectedSurgeries.some((r) => r._id === surgery._id) ? 'checked' : 'unchecked'}
                onPress={() => handleSelectSurgery(surgery)}
              />
              <Text>{`${surgery.surgery_type} ${surgery.createdAt}`}</Text>
            </View>
          ))}
        </List.Accordion>
      )}
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Update
      </Button>
      <Button mode='outlined' onPress={() => router.push(pathToAllWorkers)} style={styles.button}>
        Back To Workers
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
  surgeryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
})

export default create
