
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
      return `./resources/${type}/${id}/ShowHospital`
    case 'rooms':
      return `./resources/${type}/${id}/ShowRoom`
    case 'surgeries':
      return `./resources/${type}/${id}/ShowSurgery`
    case 'patients':
      return `./resources/${type}/${id}/ShowPatient`
    case 'workers':
      return `./resources/${type}/${id}/ShowWorker`
  }
}