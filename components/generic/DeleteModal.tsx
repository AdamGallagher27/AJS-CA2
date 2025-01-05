import React from 'react'
import { Button, DefaultTheme, Dialog, PaperProvider, Paragraph, Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { deleteResource } from '@/utils/api'
import { useToken } from '@/hooks/useToken'
import { useRouter } from 'expo-router'

type Props = {
  isVisible: boolean
  onDismiss: () => void
  resourceName: string
  id: string
}

export const DeleteModal = ({ isVisible, onDismiss, resourceName, id }: Props) => {

  const token = useToken()
  const router = useRouter()
  const pathToViewAll = `/resources/${resourceName}`

  const onDelete = () => {
    try {
      deleteResource(token, resourceName, id)
      router.push(pathToViewAll as never)
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    // for some reason this componet defaults to dark theme so i explicitly pass in the apps theme
    <PaperProvider theme={{...DefaultTheme}}>
      <Portal>
        <Dialog visible={isVisible} onDismiss={onDismiss} style={styles.container}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this item? This action cannot be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>Cancel</Button>
            <Button onPress={onDelete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
