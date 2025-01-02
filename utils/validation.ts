import { FormErrors } from '@/types'
import { Hospital } from '@/types/resources'

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