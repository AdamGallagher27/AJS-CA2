import AccountCheck from '@/components/generic/AccountCheck'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function Tab() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AccountCheck />
        <Text>
          Admin controls??????
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
