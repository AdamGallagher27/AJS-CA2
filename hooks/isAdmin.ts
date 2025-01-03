import { useStorageState } from './useStorageState'

export const isAdmin = () => {
  const [[isLoading, session], setSession] = useStorageState('session')
  
  if(session) {
    const role = JSON.parse(session).role

    return role === 'admin'
  }

  return false
}