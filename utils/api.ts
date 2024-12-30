import { Hospital, Patient, Room, Surgery, Worker, UserResources } from '@/types/resources'

const { EXPO_PUBLIC_API_URL } = process.env

// hospitals
export const fetchHospitalById = async (id: string): Promise<Hospital | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/hospitals/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch hospital with id ${id}`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved.data
    }

    return null

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}

export const fetchAllHospitals = async (): Promise<Hospital[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/hospitals`)
    if (!response.ok) {
      throw new Error(`Failed to fetch hospitals`)
    }
    const resolved = await response.json()

    console.log(resolved)

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}

export const fetchHospitalsByUser = async (token: string): Promise<Hospital[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/hospitals/myHospitals/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch hospitals`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}



// rooms
export const fetchRoomById = async (id: string, token: string): Promise<Room | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch room with id ${id}`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved.data
    }

    return null

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}

export const fetchAllRooms = async (token: string): Promise<Room[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}

export const fetchRoomsByUser = async (token: string): Promise<Room[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/rooms/myRooms/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch rooms`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}

// surgeries
export const fetchSurgeryById = async (id: string, token: string): Promise<Surgery | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/surgeries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch surgery with id ${id}`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved.data
    }

    return null

  } catch (error) {
    console.error('Error fetching surgery:', error)
    throw error
  }
}

export const fetchAllSurgeries = async (token: string): Promise<Surgery[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/surgeries`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch surgeries`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching surgeries:', error)
    throw error
  }
}

export const fetchSurgeriesByUser = async (token: string): Promise<Surgery[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/surgeries/mySurgeries/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch surgeries`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching surgeries:', error)
    throw error
  }
}

// workers
export const fetchWorkerById = async (id: string, token: string): Promise<Worker | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/workers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch worker with id ${id}`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved.data
    }

    return null

  } catch (error) {
    console.error('Error fetching worker:', error)
    throw error
  }
}

export const fetchAllWorkers = async (token: string): Promise<Worker[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/workers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch workers`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching workers:', error)
    throw error
  }
}

export const fetchWorkersByUser = async (token: string): Promise<Worker[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/workers/myWorkers/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch workers`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching workers:', error)
    throw error
  }
}


// patients
export const fetchPatientById = async (id: string, token: string): Promise<Patient | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch patient with id ${id}`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved.data
    }

    return null

  } catch (error) {
    console.error('Error fetching patient:', error)
    throw error
  }
}

export const fetchAllPatients = async (token: string): Promise<Patient[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/patients`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch patients`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching patients:', error)
    throw error
  }
}

export const fetchPatientsByUser = async (token: string): Promise<Patient[] | null> => {
  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/patients/myPatients/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch patients`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  } catch (error) {
    console.error('Error fetching patients:', error)
    throw error
  }
}

export const fetchUserCreatedResources = async (token: string): Promise<UserResources | null> => {

  try {
    const [hospitals, rooms, surgeries, patients, workers] = await Promise.all([
      fetchAllHospitals(),
      fetchAllRooms(token),
      fetchAllSurgeries(token),
      fetchAllPatients(token),
      fetchAllWorkers(token)
    ])

    return {
      hospitals,
      rooms,
      surgeries,
      patients,
      workers
    }
  }
  catch(error) {
    console.error(error)
  }

  return null

}

export const deleteResource = async (token: string, resourceName: string, id: string) => {
  try{
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/${resourceName}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch patients`)
    }
    const resolved = await response.json()

    if(resolved) {
      return resolved
    }

    return null

  }
  catch(error) {
    console.error(error)
  }
}