import { Text, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import axios from 'axios'
import { useSession } from '@/contexts/AuthContext'
import React from 'react'
import { useRouter } from 'expo-router'

export const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { signIn } = useSession()


  // This routing is different to my other routing
  // I had this issue where after logging in the home page would not 
  // rerender with authenticated controls
  // I added an intermediary route called loading
  // it takes in a route and then redirects to that route
  // this forces the home page to rerender with authenticated controls
  const handleNavigation = () => {
    router.push('/loading?route=/') 
  }

  const handlePress = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users/login`, {
      email: form.email,
      password: form.password
    })
      .then(response => {
        signIn(response.data)
        handleNavigation()
      })
      .catch(e => {
        setError(e.response.data.message)
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        label='Email'
        mode='outlined'
        value={form.email}
        onChangeText={(text) => setForm(prevState => ({ ...prevState, email: text }))}
        style={styles.input}
        keyboardType='email-address'
      />

      <TextInput
        label='Password'
        mode='outlined'
        value={form.password}
        onChangeText={(text) => setForm(prevState => ({ ...prevState, password: text }))}
        style={styles.input}
        secureTextEntry
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      <Button
        mode='contained'
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
