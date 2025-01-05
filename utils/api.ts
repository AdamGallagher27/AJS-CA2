import { UserResources } from '@/types/resources'
import axios from 'axios'
import { capitalizeFirstLetter } from '.'

const { EXPO_PUBLIC_API_URL } = process.env

// get all resources from the database
export const fetchAll = async (resource: string, token?: string) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response && response.data) {
      return response.data
    }

  } catch (error) {
    console.error(`Error fetching ${resource}:`, error)
    throw error
  }
}

// get one resource by the id
export const fetchById = async (resource: string, id: string, token?: string) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/${resource}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response && response.data.data) {
      return response.data.data
    }

  } catch (error) {
    console.error('Error fetching hospital:', error)
    throw error
  }
}


// get all resources from the database
const fetchAllByUser = async (resource: string, token?: string) => {

  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/${resource}/my${capitalizeFirstLetter(resource)}/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response && response.data) {

      console.log(response.data.data)

      return response.data.data
    }

  } catch (error) {
    console.error(`Error fetching ${resource}:`, error)
  }
}


// get all resources that the user created by comparing the users id and the id in each table
// its rare but everynow and then this times out because it makes alot of requests
// if I was making a bigger app i refactor this 
export const fetchUserCreatedResources = async (token: string): Promise<UserResources | null> => {


  try {
    const hospitals = await fetchAllByUser('hospitals', token)
    const rooms = await fetchAllByUser('rooms', token)
    const surgeries = await fetchAllByUser('surgeries', token)
    const patients = await fetchAllByUser('patients', token)
    const workers = await fetchAllByUser('workers', token)

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

// delete resources
export const deleteResource = async (token: string, resourceName: string, id: string) => {
  try{
    const response = await axios.delete(`${EXPO_PUBLIC_API_URL}/api/${resourceName}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response && response.data) {
      return response.data
    }

  }
  catch(error) {
    console.error(error)
  }
}
