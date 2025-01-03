import { Text } from 'react-native'
import { Slot } from 'expo-router'
import { useSession } from '@/contexts/AuthContext'
import { AccountCheck } from '@/components/generic/AccountCheck'

export default function Root() {
    const { session, isLoading }: any = useSession()

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (!session) {
        return <AccountCheck />
    }

    return (
        <Slot />
    )
}