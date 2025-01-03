import { AccountCheck } from '@/components/generic/AccountCheck'
import { SignOutButton } from '@/components/generic/SignOutButton'
import { useToken } from '@/hooks/useToken'
import { StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const Tab = () => {
  const token = useToken()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {!token ? <AccountCheck /> : <SignOutButton />}
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

export default Tab