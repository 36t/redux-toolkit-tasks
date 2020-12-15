import axios from 'axios'

const apiUrl = 'http://localhost:8000/'
const token = localStorage.localJWT

export type LoginType = {
  username: string
  password: string
}

export type JWTType = {
  refresh : string
  access: string
}

export type LoginResponseType = {
  data: JWTType
}

export type RegisterResponseType = {
  data: ProfileType
}

export type ProfileType = {
  id: number
  username: string
}

export type ProfileResponseType = {
  data: ProfileType
}

export const fetchLogin = async (auth: LoginType): Promise<LoginResponseType> => {
  return await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const fetchRegister = async (auth: LoginType): Promise<RegisterResponseType> => {
  return await axios.post(`${apiUrl}api/register/`, auth, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const fetchProfile = async (): Promise<ProfileResponseType> => {
  return await axios.get(`${apiUrl}pi/myself/`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
}
