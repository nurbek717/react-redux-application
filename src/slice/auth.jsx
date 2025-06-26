import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../helpers/locall-storage'
const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true
        },
        signUserSuccess: (state,actions) => {
             state.loggedIn = true
             state.isLoading = false
             state.user = actions.payload
             //locall-storage
             setItem('token',actions.payload.token)
        },
        signUserFailure: (state, actions) => {
             state.isLoading = false
            state.error = actions.payload
        },
        logoutUser: state => {
            state.user = null
            state.loggedIn = false
        }
    },
})

export const {signUserStart, signUserSuccess, signUserFailure , logoutUser} = authSlice.actions
export default authSlice.reducer