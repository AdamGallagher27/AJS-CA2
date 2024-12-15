import { useStorageState } from "./useStorageState"

export const useUserId = () => {
  const [[isLoading, session], setSession] = useStorageState('session')
  
  if(session) {
    return JSON.parse(session).user_id
  }
}