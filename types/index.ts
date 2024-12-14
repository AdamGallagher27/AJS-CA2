
interface DatabaseEntry {
  _id: string
  created_by: string
  is_deleted?: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

enum WorkerRole {
  Doctor = 'doctor',
  Nurse = 'nurse',
  Surgeon = 'surgeon',
}

interface Worker extends DatabaseEntry {
  worker_role: WorkerRole
  first_name: string
  last_name: string
  surgeries?: string[]
}

interface Patient extends DatabaseEntry {
  first_name: string
  last_name: string
  insurance: boolean
  age: number
  condition: string
  surgeries?: string[]
}

interface Surgery extends DatabaseEntry {
  surgery_type: string
  date: string  
  duration: number  
  room: string 
  patient: Patient  
  workers?: Worker[]  
}

interface Room extends DatabaseEntry {
  room_number: number
  room_type: string
  availability_status: boolean
  daily_rate: number
  hospital: string 
  surgeries?: Surgery[]
}

interface Hospital extends DatabaseEntry {
  has_emergency_services: boolean
  number_of_departments: number
  daily_rate: number
  city: string
  title: string
  rooms?: Room[]
}

interface HospitalId extends Hospital {
  _id: string
}

interface IAuthContext {
  signIn: (token:string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

// export type IResponseType = HospitalId