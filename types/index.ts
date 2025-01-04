import { Hospital } from './resources'

export interface UserData {
  message: string
  full_name: string
  email: string
  user_id: string
  role: string
  token: string
}

interface HospitalId extends Hospital {
  _id: string
}

export interface IAuthContext {
  signIn: (UserData: UserData) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

export interface ApiResponse {
  data: Hospital
  message: string
}

// this type is for returning an object of errors
// it has all the properties of resources but has them all as optional params
// so it can be used accross all resource forms
export interface FormErrors {
  has_emergency_services?: string
  number_of_departments?: string
  daily_rate?: string
  city?: string
  title?: string
  first_name?: string
  last_name?: string
  insurance?: string
  age?: string
  condition?: string
  room_number?: string
  room_type?: string
  availability_status?: string
  hospital?: string
  surgeries?: string
  surgery_type?: string
  date?: string  
  duration?: string
  room?: string 
  patient?: string  
  workers?: string  
  worker_role?: string
}