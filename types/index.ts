import { Hospital } from "./resources"

export interface UserData {
  message: string
  full_name: string
  email: string
  user_id: string
  role: string
  token: string
}

// these should never be null because they come from the db
//  but for convenience I made them optional params
export interface DatabaseEntry {
  _id: string
  created_by?: string
  is_deleted?: boolean
  createdAt?: string
  updatedAt?: string
  __v?: number
}

interface HospitalId extends Hospital {
  _id: string
}

export interface IAuthContext {
  signIn: (UserData:UserData) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

export interface ApiResponse {
  data: Hospital
  message: string
}
