import axios from 'axios'

const apiUrl = 'http://localhost:8000/'
const token = localStorage.localJWT

export const fetchLogin = async (auth: string): Promise<ResponseType> => {
  return await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const fetchRegister = async (auth: string): Promise<ResponseType> => {
  return await axios.post(`${apiUrl}api/register/`, auth, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const fetchProfile = async (): Promise<ResponseType> => {
  return await axios.get(`${apiUrl}pi/myself/`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
}
