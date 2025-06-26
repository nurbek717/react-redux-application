import { useEffect, useState } from "react"
import {icon} from "../constants/index"
import { Input } from "../ui"
import { useSelector, useDispatch } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth"
import AuthService from "../service/auth"
import {ValidationError} from "./"
import { useNavigate } from "react-router-dom"


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const {isLoading,loggedIn} = useSelector(state => state.auth)
    const navigate = useNavigate()

const loginHeandel = async e => {
  e.preventDefault();
  dispatch(signUserStart());
  const user = { email, password}
  try {
    const responsev = await AuthService.userLogin(user)
     dispatch(signUserSuccess(responsev.user));
     navigate('/')
  } catch (error) { 
    const errors = error?.response?.data?.errors || { server: ['Unexpected error'] }
    dispatch(signUserFailure(errors))
  }
}

useEffect(() => {
 if (loggedIn) {
  navigate('/')
 }
}, [loggedIn])
  return (
   <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-4 mt-2" src={icon} alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>
          <ValidationError/>
            <Input lable={"Email address"} state={email} setState={setEmail}/>
            <Input lable={"Password"} type={'password'} state={password} setState={setPassword}/>

          <button  className="w-100 btn btn-lg btn-primary mt-4" disabled={isLoading}  onClick={loginHeandel} type="submit">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login