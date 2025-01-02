import React from 'react'
import { HelperText } from 'react-native-paper';

type Props = {
  message: string | undefined
}

export const FormError = ({message}: Props) => {

  if(!message) return null

  return (
      <HelperText type='error'>
        {message}
      </HelperText>
  )
}
