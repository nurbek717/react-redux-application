import { Link, useNavigate } from "react-router-dom"
import { logo } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../helpers/locall-storage"
import {logoutUser} from "../slice/auth"

function Navbar({item}) {
   //Logout Start
  const {loggedIn, user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const logoutHendler = () => {
     removeItem('token')
     navigate('/login')
     dispatch(logoutUser())
  }
  //Logout end
  return (
    <div  className="d-flex flex-column flex-md-row align-items-center  border-bottom container pt-3">
   <Link to={'/'} >
     <img src={logo} width={80}  height={80} alt="" />
     </Link>

      <nav key={item?.slug}  className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
       {loggedIn ? (
           <>
           <Link to={`/profil/${item?.slug}`} className="me-3 py-2 m-0 text-dark text-decoration-none">{user.username}</Link>
            <Link className="btn btn-outline-success  me-3 py-2 text-dark text-decoration-none" to={'/create-article'}>Create</Link>
           <button onClick={logoutHendler} className="btn btn-outline-danger ">Logout</button>

           </>
       ): (
        <>
         <Link className="me-3 py-2 text-dark text-decoration-none" to={'/login'}>Login</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to={'/register'}>Register</Link>
        </>
       )}
       
      </nav>
    </div>
  )
}

export default Navbar
