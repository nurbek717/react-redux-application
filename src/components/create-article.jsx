import { useState } from "react"
import {Form} from "../components"
import ArticleServer from "../service/article"
import { useDispatch } from "react-redux"
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/articel"
import { useNavigate } from "react-router-dom"

function CreateArticle() {
  const [title , setTitle] = useState('')
  const [description , setDescription] =useState('')
  const [body, setBody] =useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
// Formani submit qilayapti
  const formSubmit = async e => {
     e.preventDefault()
     const article = {title , description, body}
     dispatch(postArticleStart())
     try {
       await ArticleServer.postArticle(article)
       dispatch(postArticleSuccess());
       navigate('/')
     } catch (error) {
      dispatch(postArticleFailure())
     }
  }

  const formProps = {title , setTitle, description, setDescription ,body, setBody ,formSubmit} 

  return (
    <div>
        <h1 className="text-center fs-2">Create Article</h1>
        <div className="w-75 m-auto">
       <Form {...formProps}/>
        </div>
       
    </div>
  )
}

export default CreateArticle