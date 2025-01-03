import { useStorageState } from './useStorageState'

export const useToken = () => {
  const [[isLoading, session], setSession] = useStorageState('session')
  
  if(session) {
    return JSON.parse(session).token
  }
}