import { Text, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react'
import axios from 'axios'
import { useSession } from '@/contexts/AuthContext'
import React from 'react'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const { signIn } = useSession()

  // fix any later
  const handleChange = (e: any) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handlePress = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users/login`, {
      email: form.email,
      password: form.password
    })
      .then(response => {
        signIn(response.data)
      })
      .catch(e => {
        console.log(e)
        setError(e.response.data.message)
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        mode="outlined"
        value={form.email}
        onChangeText={(text) => setForm(prevState => ({ ...prevState, email: text }))}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={form.password}
        onChangeText={(text) => setForm(prevState => ({ ...prevState, password: text }))}
        style={styles.input}
        secureTextEntry
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      <Button
        mode="contained"
        onPress={handlePress}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
})

export default Login