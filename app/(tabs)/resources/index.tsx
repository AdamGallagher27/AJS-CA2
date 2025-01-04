import { ResourceTitleCard } from '@/components/generic/ResourceTitleCard'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const resources = ['hospitals', 'rooms', 'surgeries', 'workers', 'patients']

const Tab = () => {

  const cards = resources.map((title: string) => {
    return <ResourceTitleCard key={title} title={title} />
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {cards}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Tab