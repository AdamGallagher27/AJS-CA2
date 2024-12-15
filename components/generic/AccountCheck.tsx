import { useState } from 'react'
import { Card, Text, } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import Login from './Login'

const AccountCheck = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.heading}>
          <Text>
            {isLoggingIn ? 'Login' : 'Register'}
          </Text>
          <View>
            {isLoggingIn ? <Login /> : 'Register'}
          </View>
        </Card.Content>
        <Card.Actions>
        <Text
            style={styles.linkText}
            onPress={() => setIsLoggingIn(!isLoggingIn)}
          >
            {isLoggingIn
              ? 'New user ? Create an Account'
              : 'Already have an account? Log In'}
          </Text>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  linkText: {
    paddingBottom: 16,
    color: 'blue', 
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
})

export default AccountCheck