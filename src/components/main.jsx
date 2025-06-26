import { useDispatch, useSelector } from "react-redux"
import {Loader} from '../ui'
import { useEffect } from "react"
import { getArticleStart, getArticleSuccess } from "../slice/articel"
import ArticleServer from "../service/article"
import ArticleCard from "./article-card"


function Main() {
  const {articles, isLoading} = useSelector(state =>  state.article)
  const dispatch = useDispatch()


    //Articleni chiqarish
    const getArticles = async () => {
      dispatch(getArticleStart())
      try {
        const response = await ArticleServer.getArticles()
        dispatch(getArticleSuccess(response.articles))
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(() => {
      getArticles()
    },  [])

  
  return (
    <>
      {isLoading &&   <Loader/>}
     
      <div className="album py-5 ">
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {articles.map(item => (
         <ArticleCard item={item} getArticles={getArticles}/>
        ))}
   
      </div>
    </div>
  </div>
    </>
  )
}

export default Main
