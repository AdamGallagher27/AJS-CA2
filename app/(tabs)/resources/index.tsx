import { Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function Tab() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>
        show a list of all resources
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})
