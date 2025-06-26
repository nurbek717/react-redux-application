import { useEffect } from "react"
import { useParams } from "react-router-dom"
import ArticleServer from "../service/article"
import { useDispatch, useSelector } from "react-redux"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/articel"
import moment from "moment/moment"
import {Loader} from '../ui'

function ArticleDetail() {
    const {slug} = useParams()
    const dispatch = useDispatch()
    const {articleDetail , isLoading} = useSelector(state => state.article)

    useEffect(() => {
        const getArticelDetail = async () => {
          dispatch(getArticleDetailStart())
          try {
             const response = await ArticleServer.getArticleDetail(slug)
             dispatch(getArticleDetailSuccess(response.article))
          } catch (error) {
            dispatch(getArticleDetailFailure())
          }
       }
      getArticelDetail()
    }, [slug])

  return  (
    <div>
      {isLoading &&   <Loader/>}
      <div className="p-5 mb-4 rounded-3">
         <div className="container-fluid py-5"> 
        <h1 class="display-5 fw-bold">{articleDetail.title}</h1>
         <p class="col-md-8 fs-4">{articleDetail.description}</p> 
         <div class="col-sm-6 col-lg-4 mb-4" >
           <div class="card"> <svg aria-label="Placeholder: Image cap" class="bd-placeholder-img card-img-top" height="200" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg> 
           <div class="card-body"> 
            <h5 class="card-title " >{articleDetail?.author?.username}</h5> 
            <p class="card-text">{articleDetail?.author?.bio}</p>
                <div className="d-flex gap-3">
                    <p className="text-muted">
                   <span className="fw-bold">Created ad: </span>  {moment(articleDetail.createdAt).format('DD MMM YYYY')}
                   </p>
                </div>  
             </div> 
             </div>
         </div>
      
       <div>
            {articleDetail.body}
          </div>
      </div>
      </div>
      </div>
     
  )
}

export default ArticleDetail