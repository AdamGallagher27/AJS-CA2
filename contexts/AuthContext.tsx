import { createContext, useContext, PropsWithChildren } from 'react'
import { IAuthContext, UserData } from '@/types'
import { useStorageState } from '@/hooks/useStorageState'

const AuthContext = createContext<IAuthContext | null>(null)

// Hook to access the session info
export const useSession = () => {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider>')
    }
  }

  return value as IAuthContext
}

export const SessionProvider = (props: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: UserData) => {
          setSession(JSON.stringify(userData))
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}