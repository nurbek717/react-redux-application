import { useEffect, useState } from "react"
import {icon} from "../constants/index"
import { Input } from "../ui"
import { useSelector, useDispatch } from 'react-redux'
import { signUserStart,signUserSuccess,signUserFailure } from "../slice/auth"
import AuthService from "../service/auth"
import {ValidationError} from "./"
import { useNavigate } from "react-router-dom"



function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, loggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()
  

  const registerHeandel = async e => {
  e.preventDefault();
  dispatch(signUserStart());
  const user = {username: name, email, password}
  try {
    const responsev = await AuthService.userRegister(user)
     dispatch(signUserSuccess(responsev.user));
     navigate('/')
  } catch (error) {
    dispatch(signUserFailure(error.response.data.errors));
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
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <ValidationError/>
            <Input lable={"Username"} state={name} setState={setName}/>
            <Input lable={"Email address"} state={email} setState={setEmail}/>
            <Input lable={"Password"} type={'password'} state={password} setState={setPassword}/>
          
          
          <button className="w-100 btn btn-lg btn-primary mt-4" disabled={isLoading}  onClick={registerHeandel} type="submit">
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Register