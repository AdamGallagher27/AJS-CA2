import { Text, TextInput, StyleSheet, Button } from 'react-native'
import { useState } from 'react'
import axios from 'axios'
import { useSession } from '@/contexts/AuthContext'
import { IAuthContext } from '@/types'
import React from 'react'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

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
        signIn(response.data.token)
      })
      .catch(e => {
        console.log(e)
        setError(e.response.data.message)
      })
  }

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={form.email}
        onChange={handleChange}
        id='email'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        value={form.password}
        onChange={handleChange}
        id='password'
      />

      <Text>{error}</Text>

      <Button
        onPress={handlePress}
        title="Submit"
        color="#841584"
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10
  }
})

export default Login