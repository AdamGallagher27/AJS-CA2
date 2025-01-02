import { DatabaseEntry } from "."

enum WorkerRole {
  Doctor = 'doctor',
  Nurse = 'nurse',
  Surgeon = 'surgeon',
}

export interface Worker extends DatabaseEntry {
  worker_role: WorkerRole
  first_name: string
  last_name: string
  surgeries?: string[]
}

export interface Patient extends DatabaseEntry {
  first_name: string
  last_name: string
  insurance: boolean
  age: number
  condition: string
  surgeries?: string[]
}

export interface Surgery extends DatabaseEntry {
  surgery_type: string
  date: string  
  duration: number  
  room: string 
  patient: Patient  
  workers?: Worker[]  
}

export interface Room extends DatabaseEntry {
  room_number: number
  room_type: string
  availability_status: boolean
  daily_rate: number
  hospital: string 
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