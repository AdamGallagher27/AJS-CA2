import { ResourceTitleCard } from '@/components/generic/ResourceTitleCard'
import { StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const resources = ['hospitals', 'rooms', 'surgeries', 'workers', 'patients']

const Tab = () => {

  const cards = resources.map((title: string) => {
    return <ResourceTitleCard key={title} title={title} />
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {cards}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Tab