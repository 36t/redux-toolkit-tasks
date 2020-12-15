import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  editUsername,
  editPassword,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView
} from './loginSlice'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const authen = useSelector(selectAuthen)
  const isLoginView = useSelector(selectIsLoginView)

  const isButtonActive = authen.username === '' || authen.password === ''

  const login = async () => {
    if (isLoginView) {
      // ログイン
      await dispatch(fetchAsyncLogin(authen))
    } else {
      // 新規ユーザー
      const result = await dispatch(fetchAsyncRegister(authen))

      console.log(result)

      // if (fetchAsyncRegister.fulfilled.match(result)) {
      //   await dispatch(fetchAsyncLogin(authen))
      // }
    }
  }

  return (
    <div>
      <h1>{isLoginView ? 'Login' : 'Register'}</h1>
      <p>
        <span>Username: </span>
        <input type="text" name="username" placeholder="" onChange={(event) => dispatch(editUsername(event.target.value))} required/>
      </p>
      <p>
        <span>Password: </span>
        <input type="password" name="password" placeholder="" onChange={(event) => dispatch(editPassword(event.target.value))} required/>
      </p>
      <p><button disabled={isButtonActive} onClick={login}>{isLoginView ? 'Login' : 'Create'}</button></p>
      <p>
        <span onClick={() => dispatch(toggleMode())}>
          {isLoginView ? 'Create Account ?' : 'Back to Login'}
        </span>
      </p>
    </div>
  )
}

export default Login
