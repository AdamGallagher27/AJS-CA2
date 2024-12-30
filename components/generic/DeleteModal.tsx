import React from 'react'
import { Button, Dialog, PaperProvider, Paragraph, Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { deleteResource } from '@/utils/api'
import { useToken } from '@/hooks/useToken'

type Props = {
  isVisible: boolean
  onDismiss: () => void
  resourceName: string
  id:string
}

const DeleteModal = ({ isVisible, onDismiss, resourceName, id }: Props) => {


  const token = useToken()

  const onDelete = () => {
    try {
      deleteResource(token, resourceName, id)
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <PaperProvider>
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
    // backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
  })

export default DeleteModal