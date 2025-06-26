import { Route, Routes } from "react-router-dom"
import { Main, Login, Register,Navbar ,ArticelDetail,CreateArticle, EditArticle, Profil } from "./components"
import AuthService from "./service/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { signUserSuccess } from "./slice/auth"
import { getItem } from "./helpers/locall-storage" //locall-storage bilan ishlash:


function App() {
   const dispatch = useDispatch()
  //locall-storage
  const getUser = async () => {
   try {
    const response = await AuthService.getUser()
   dispatch(signUserSuccess(response.user))
   } catch (error) {
    console.log(error);
    
   }
  }

  
  // Tokenni olib beradi 
useEffect(() => {
  const token = getItem("token")
  if (token) {
    getUser()
  }
  
  
}, [])

 //locall-storage
  return (
    <div>
      <Navbar/>
      <div className="container">
        <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profil/:slug" element={<Profil/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/article/:slug" element={<ArticelDetail/>}/>
        <Route path="/create-article" element={<CreateArticle/>}/>
        <Route path="/edit-article/:slug" element={<EditArticle/>}/>
      </Routes>
      </div>
      
    </div>
  )
}

export default App
