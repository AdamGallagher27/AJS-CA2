import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card } from 'react-native-paper'

interface Props {
  resourceName: string
}

export const NoResources = ({ resourceName }: Props) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>No {resourceName || 'resources'} found.</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
})
