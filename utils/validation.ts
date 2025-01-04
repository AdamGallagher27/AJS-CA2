import { FormErrors } from '@/types'
import { Hospital, Patient, Room, Surgery, Worker } from '@/types/resources'
import { Dispatch, SetStateAction } from 'react'

export const validateHospitalForm = (form: Hospital | null, setErrors: React.Dispatch<React.SetStateAction<FormErrors | null | undefined>>) => {

  if(!form) return false

  let newErrors: FormErrors = {}
  if (!form.title.trim()) newErrors.title = 'Title is required'
  if (!form.city.trim()) newErrors.city = 'City is required'
  if (!form.daily_rate || isNaN(form.daily_rate as number) || Number(form.daily_rate) <= 0) {
    newErrors.daily_rate = 'Daily rate must be a positive number'
  }
  if (!form.number_of_departments || isNaN(form.number_of_departments as number) || Number(form.number_of_departments) <= 0) {
    newErrors.number_of_departments = 'Number of departments must be a positive number'
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const validatePatientForm = (form: Patient | null, setErrors: React.Dispatch<React.SetStateAction<FormErrors | null | undefined>>) => {
  if (!form) return false

  let newErrors: FormErrors = {}
  if (!form.first_name.trim()) newErrors.first_name = 'First name is required'
  if (!form.last_name.trim()) newErrors.last_name = 'Last name is required'
  if (typeof form.insurance !== 'boolean') newErrors.insurance = 'Insurance must be a boolean value'
  if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0) {
    newErrors.age = 'Age must be a positive number'
  }
  if (!form.condition.trim()) newErrors.condition = 'Condition is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const validateRoomForm = (form: Room | null, setErrors: Dispatch<SetStateAction<FormErrors | null>>) => {
  if (!form) return false

  let newErrors: FormErrors = {}

  if (!form.room_number || (!isNaN(Number(form.room_number)) && Number(form.room_number) <= 0)) {
    newErrors.room_number = 'Room number must be a positive number or a valid string'
  }
  if (!form.room_type.trim()) newErrors.room_type = 'Room type is required'
  if (typeof form.availability_status !== 'boolean') {
    newErrors.availability_status = 'Availability status must be a boolean value'
  }
  if (!form.daily_rate || isNaN(Number(form.daily_rate)) || Number(form.daily_rate) <= 0) {
    newErrors.daily_rate = 'Daily rate must be a positive number'
  }
  if (form.hospital && typeof form.hospital !== 'object') {
    newErrors.hospital = 'Hospital must be a valid object'
  }
  if (form.surgeries && !Array.isArray(form.surgeries)) {
    newErrors.surgeries = 'Surgeries must be an array'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const validateSurgeryForm = (form: Surgery, setErrors: React.Dispatch<React.SetStateAction<FormErrors | null | undefined>>) => {
  if (!form) return false

  let newErrors: FormErrors = {}
  if (!form.surgery_type.trim()) newErrors.surgery_type = 'Surgery type is required'
  if (!form.date || isNaN(Date.parse(form.date))) {
    newErrors.date = 'Date must be a valid date string'
  }
  if (!form.duration || isNaN(Number(form.duration)) || Number(form.duration) <= 0) {
    newErrors.duration = 'Duration must be a positive number'
  }
  if (form.room && typeof form.room !== 'object') {
    newErrors.room = 'Room must be a valid object'
  }
  if (form.patient && typeof form.patient !== 'object') {
    newErrors.patient = 'Patient must be a valid object'
  }
  if (form.workers && !Array.isArray(form.workers)) {
    newErrors.workers = 'Workers must be an array'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}


export const validateWorkerForm = (form: Worker, setErrors: React.Dispatch<React.SetStateAction<FormErrors | null | undefined>>) => {
  if (!form) return false
  let newErrors: FormErrors = {}
  if (!form.worker_role.trim()) newErrors.worker_role = 'Surgery type is required'
  if (!form.first_name.trim()) newErrors.first_name = 'First name is required'
  if (!form.last_name.trim()) newErrors.last_name = 'Last name is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}