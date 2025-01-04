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

export interface Worker extends DatabaseEntry {
  worker_role: string
  first_name: string
  last_name: string
  surgeries?: Surgery[]
}

export interface Patient extends DatabaseEntry {
  first_name: string
  last_name: string
  insurance: boolean
  age: number | string
  condition: string
  surgeries?: Surgery[]
}

export interface Surgery extends DatabaseEntry {
  surgery_type: string
  date: string  
  duration: number | string
  room?: Room 
  patient?: Patient  
  workers?: Worker[]  
}

export interface Room extends DatabaseEntry {
  room_number: number | string
  room_type: string
  availability_status: boolean
  daily_rate: number | string
  hospital?: Hospital 
  surgeries?: Surgery[]
}

export interface Hospital extends DatabaseEntry {
  has_emergency_services: boolean
  number_of_departments: number | string
  daily_rate: number | string
  city: string
  title: string
  rooms?: Room[]
}

export interface UserResources {
  hospitals: Hospital[] | null
  rooms: Room[] | null
  surgeries: Surgery[] | null
  patients: Patient[] | null
  workers: Worker[] | null
}