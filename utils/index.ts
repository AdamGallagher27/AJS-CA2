import { Hospital, Room, Surgery, Worker } from '@/types/resources'

// this is for getting the correct property name for the user created resource component
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

// helper function to send the user to the correct show route on usercreated resource component
export const getRouteBasedOnResourceType = (type: string, id: string,) => {
  return `./resources/${type}/${id}/show`
}

// this will take an array of resources and return an array of ids 
// this has to be done in 1:m and m:m relationships
// becasuse the api expects an array of ids
export const getResourceIdsFromArray = (resourceArray: Worker[] | Surgery[] | Hospital[] | Room[] | Surgery[] ) => {
  return resourceArray.map(resource => resource._id)
}

export const capitalizeFirstLetter = (string: string) => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1)
}