import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchLogin, fetchRegister, fetchProfile, LoginType, JWTType, ProfileType } from 'service/authService'
import { RootState } from 'app/store'

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth:LoginType) => {
  const response = await fetchLogin(auth)
  return response.data as JWTType
})

export const fetchAsyncRegister = createAsyncThunk(
  'login/register',
  async (auth: LoginType) => {
    const response = await fetchRegister(auth)
    return response.data as ProfileType
  }
)

export const fetchAsyncProfile = createAsyncThunk('login/get', async () => {
  const response = await fetchProfile()
  return response.data as ProfileType
})

interface LoginState {
  authen: LoginType,
  isLoginView: boolean,
  profile: ProfileType
}

const initialState: LoginState = {
  authen: {
    username: '',
    password: ''
  },
  isLoginView: true,
  profile: {
    id: 0,
    username: ''
  }
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editUsername (state, action: PayloadAction<string>) {
      state.authen.username = action.payload
    },
    editPassword (state, action: PayloadAction<string>) {
      state.authen.password = action.payload
    },
    toggleMode (state) {
      state.isLoginView = !state.isLoginView
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access)
      action.payload.access && (window.location.href = '/tasks')
    })
    builder.addCase(fetchAsyncProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  }
})

export const { editUsername, editPassword, toggleMode } = loginSlice.actions

export const selectAuthen = (state: RootState): LoginType => state.login.authen

export const selectIsLoginView = (state: RootState): boolean => state.login.isLoginView

export const selectProfile = (state: RootState): ProfileType => state.login.profile

export default loginSlice.reducer
