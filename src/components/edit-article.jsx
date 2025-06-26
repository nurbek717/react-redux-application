import { useEffect, useState } from "react"
import {Form} from "../components"
import { useDispatch } from "react-redux"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/articel"
import ArticleServer from "../service/article"
import { useNavigate, useParams } from "react-router-dom"
function EditArticle() {
      const [title , setTitle] = useState('')
      const [description , setDescription] =useState('')
      const [body, setBody] =useState('')
      const dispatch = useDispatch()
      const {slug} = useParams()
      const navigate = useNavigate()


      useEffect(() => {
            const getArticelDetail = async () => {
            dispatch(getArticleDetailStart())
          try {
             const response = await ArticleServer.getArticleDetail(slug)
             setTitle(response.article.title)
             setDescription(response.article.description)
             setBody(response.article.body)
             dispatch(getArticleDetailSuccess(response.article))
          } catch (error) {
            dispatch(getArticleDetailFailure())
          }
       }

       getArticelDetail()
      },[])

     const formSubmit = async e => {
        e.preventDefault()
        const article = {title , description, body}
        dispatch(postArticleStart())
        try {
        await ArticleServer.putArticle( slug ,article)
        dispatch(postArticleSuccess());
        navigate('/')
        } catch (error) {
        dispatch(postArticleFailure())
        }
  }
      const formProps = {title , setTitle, description, setDescription ,body, setBody ,formSubmit} 
      
  return (
    <div className="text-center">
         <h1 className="text-center fs-2">Edit Article</h1>
        <div className="w-75 m-auto">
         <Form {...formProps}/>
        </div>
       
    </div>
  )
}

export default EditArticle