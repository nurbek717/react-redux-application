import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoading: false,
    articles: [],
    articleDetail: 'null',
    error: "null"
}
export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
      //Hamma article ni malumotlari 
        getArticleStart: state => {
          state.isLoading = true
        },
        getArticleSuccess: (state , actions) => {
          state.isLoading = false
          state.articles = actions.payload
        },
        getArticleFailure: (state , actions) => {
            state.error = actions.payload
            state.isLoading = false
        },
        //Bitta articleni malumotlari
        getArticleDetailStart: state => {
          state.isLoading = true
        },
        getArticleDetailSuccess: (state , actions) => {
          state.isLoading = false
          state.articleDetail = actions.payload
        },
        getArticleDetailFailure: state => {
          state.isLoading = false
        },
        postArticleStart : state => {
          state.isLoading = true
        },
        postArticleSuccess: state => {
          state.isLoading = false
        },
        postArticleFailure: state => {
          state.isLoading = false
          state.error = "Error"
        },
    },
})

export const {getArticleStart,getArticleSuccess , getArticleFailure, getArticleDetailStart,getArticleDetailSuccess,getArticleDetailFailure , postArticleStart,postArticleSuccess,postArticleFailure} = articleSlice.actions
export default articleSlice.reducer