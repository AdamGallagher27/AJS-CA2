
// for all the api testing in this app i used chatgpt to help me write it

import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

export const mockAxiosGet = (responseData: any) => {
  mockedAxios.get.mockResolvedValueOnce({ data: responseData })
}

export const mockAxiosGetError = (errorMessage: string) => {
  mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))
}

export default mockedAxios