import { Hospital, Room } from '@/types/resources'

export const getPropertyNameBasedOnResourceType = (type: string) => {
  switch (type) {
    case 'hospitals':
      return 'title'
    case 'rooms':
      return 'room_number'
    case 'surgeries':
      return 'surgery_type'
    case 'patients':
      return 'last_name'
    case 'workers':
      return 'last_name'
  }
}

export const getRouteBasedOnResourceType = (type: string, id: string,) => {
  switch (type) {
    case 'hospitals':
      return `./resources/${type}/${id}/show`
    case 'rooms':
      return `./resources/${type}/${id}/show`
    case 'surgeries':
      return `./resources/${type}/${id}/show`
    case 'patients':
      return `./resources/${type}/${id}/show`
    case 'workers':
      return `./resources/${type}/${id}/show`
  }
}

export const getResourceIdsFromArray = (resourceArray: Hospital[] | Room[]) => {
  return resourceArray.map(resource => resource._id)
}