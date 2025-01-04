import { FormError } from '@/components/generic/FormError'
import { useToken } from '@/hooks/useToken'
import { useUserId } from '@/hooks/useUserId'
import { FormErrors } from '@/types'
import { Patient, Surgery } from '@/types/resources'
import { getResourceIdsFromArray } from '@/utils'
import { fetchAll } from '@/utils/api'
import { validatePatientForm } from '@/utils/validation'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Switch, Button, List, Checkbox } from 'react-native-paper'

const initalFormState = {
  _id: '',
  first_name: '',
  last_name: '',
  condition: '',
  age: '',
  insurance: false,
  surgeries: [],
}

const create = () => {
  const token = useToken()
  const userId = useUserId()

  // state variable for the form
  const [form, setForm] = useState<Patient>(initalFormState)

  // surgeries from db
  const [allSurgeries, setAllSurgeries] = useState<Surgery[] | null>([])

  // surgeries selected from the ui
  const [selectedSurgeries, setSelectedSurgeries] = useState<Surgery[]>([])

  // state variable for the error messages
  const [errors, setErrors] = useState<FormErrors | null>()

  const router = useRouter()
  const pathToAllPatients = '/resources/patients'


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
    const fetchSurgeries = async () => {
      if (token) {
        setAllSurgeries(await fetchAll('surgeries', token))
      }
    }
    fetchSurgeries()
  }, [token])

  const create = async () => {
    // I need to omit the _id value which comes from the inital form state variable 
    // which causes a 422 error on the api
    // chatgpt
    const { _id, ...formWithoutId } = form as Patient

    const body = await {
      ...formWithoutId,
      created_by: userId,
      surgeries: getResourceIdsFromArray(selectedSurgeries),
    }

    try {
      console.log(body)

      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/patients`, body, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
      },
        
      })

      if (response && response.data) {
        const resolved = await response.data
        const pathToShow = `/resources/patients/${resolved.data._id}/show`

        router.push(pathToShow as never)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (validatePatientForm(form, setErrors)) {
      create()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Patient</Text>
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
      <FormError message={errors?.age as string} />
      <TextInput
        placeholder='Age'
        value={String(form.age)}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState
              ? { ...prevState, age: Number(text) }
              : { ...initalFormState, age: Number(text) }
          )
        }
      />
      <FormError message={errors?.condition} />
      <TextInput
        placeholder='Condition'
        value={form.condition}
        style={styles.input}
        onChangeText={(text) =>
          setForm((prevState) =>
            prevState ? { ...prevState, condition: text } : { ...initalFormState, condition: text }
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
      <View style={styles.switchContainer}>
        <Text>Patient has Insurance</Text>
        <Switch
          value={form.insurance}
          onValueChange={(input) =>
            setForm((prevState) =>
              prevState
                ? { ...prevState, insurance: input }
                : { ...initalFormState, insurance: input }
            )
          }
        />
      </View>
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Create
      </Button>
      <Button mode='outlined' onPress={() => router.push(pathToAllPatients)} style={styles.button}>
        Back To Patients
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
