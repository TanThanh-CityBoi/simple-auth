import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../api/user.api'
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash'
import { cookiesUtil } from '../utils/utils'

const signOut = createAction('auth/signOut');
const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    return await userAPI.signIn({ email, password });
  }
)
const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (token) => {
    return await userAPI.signInGoogle({ googleAccessToken: token });
  }
)

export const userAction = { signIn, signOut, googleSignIn }

const currentUser = cookiesUtil.getCurrentUser()
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogedIn: isEmpty(currentUser) ? false : true,
    currentUser: currentUser || null,
    errorMessage: ''
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLogedIn = true
      state.currentUser = action.payload.data.user
      cookiesUtil.setCurrentUser(action.payload.data.user)
      cookiesUtil.setAccessToken(action.payload.data.token)
      toast.success(action.payload.message || "LOGIN SUCCESSFULLY")
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLogedIn = false;
      state.currentUser = null
      toast.error(action.error.message || "LOGIN FAIL")
    })
    builder.addCase(signOut, (state) => {
      state.isLogedIn = false;
      state.currentUser = null;
      cookiesUtil.remove('_user');
      cookiesUtil.remove('_jwt');
    })
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.isLogedIn = true
      state.currentUser = action.payload.data.user
      cookiesUtil.setCurrentUser(action.payload.data.user)
      cookiesUtil.setAccessToken(action.payload.data.token)
      toast.success(action.payload.message || "LOGIN SUCCESSFULLY")
    })
    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.isLogedIn = false;
      state.currentUser = null
      toast.error(action.error.message || "LOGIN FAIL")
    })
  }
})