import mockedAxios, { mockAxiosGet, mockAxiosGetError } from './mock'
import { fetchAll, fetchById, fetchUserCreatedResources } from '../utils/api'

describe('fetchAll', () => {
  it('get resources successfully', async () => {

    // mocked success response
    mockAxiosGet([{ id: 1, name: 'Resource 1' }, { id: 2, name: 'Resource 2' }])

    const result = await fetchAll('testResource', 'testToken')

    // check that the call was made to the correct url with the proper headers
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.EXPO_PUBLIC_API_URL}/api/testResource`,
      {
        headers: { Authorization: 'Bearer testToken' },
      }
    )

    // ensure the returned value matches the mocked result
    expect(result).toEqual([{ id: 1, name: 'Resource 1' }, { id: 2, name: 'Resource 2' }])
  })
})

describe('fetchById', () => {
  it('get resource by id', async () => {

    // mock a sample response
    mockAxiosGet({ data: { id: '1', name: 'Resource 1' } })

    const result = await fetchById('testResource', '1', 'testToken')

    // check that the call was made to the correct url with the proper headers
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.EXPO_PUBLIC_API_URL}/api/testResource/1`,
      {
        headers: { Authorization: 'Bearer testToken' },
      }
    )

    // ensure the returned value matches the mocked result
    expect(result).toEqual({ id: '1', name: 'Resource 1' })
  })
})

describe('fetchUserCreatedResources', () => {
  it('get all user-created resources successfully', async () => {
    // mock individual responses
    mockAxiosGet([{ id: 'hospital' }])
    mockAxiosGet([{ id: 'room' }])
    mockAxiosGet([{ id: 'surgery' }])
    mockAxiosGet([{ id: 'patient' }])
    mockAxiosGet([{ id: 'worker' }])

    const result = await fetchUserCreatedResources('testToken')

    // expect the results to match the mocked respones
    expect(result).toEqual({
      hospitals: [{ id: 'hospital' }],
      rooms: [{ id: 'room' }],
      surgeries: [{ id: 'surgery' }],
      patients: [{ id: 'patient' }],
      workers: [{ id: 'worker' }],
    })
  })

  it('should return null when one of the fetches fails', async () => {
    mockAxiosGetError('Network Error')

    const result = await fetchUserCreatedResources('testToken')
    expect(result).toBeNull()
  })
});