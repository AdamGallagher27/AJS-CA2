import { Text, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react'
import React from 'react'
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handlePress = () => {
    // for some reason axios does not fail cors but fetch does???????
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users/register`, {
      full_name: form.fullName,
      email: form.email,
      password: form.password
    })
    .then(response => {

      // route to login form then
      console.log(response)
    })
    .catch(error => {
      // write proper error handleing for this
      console.log(error)
      
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        label='Full Name'
        mode='outlined'
        value={form.fullName}
        onChangeText={(text) => setForm(prevState => ({ ...prevState, fullName: text }))}
        style={styles.input}
      />

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
        Register
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

export default Register