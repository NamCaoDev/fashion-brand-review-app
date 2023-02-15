import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import authAPI from './authApi'
import { SignInParams, SignUpParams } from './types'

// Sign In
const signIn = createAsyncThunk<any, SignInParams, { rejectValue: APIError }>(
  'auth/sign-in',
  async (params, { rejectWithValue }) => {
    try {
      return await authAPI.signIn(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

// Sign Up
const signUp = createAsyncThunk<any, SignUpParams, { rejectValue: APIError }>(
  'auth/sign-up',
  async (params, { rejectWithValue }) => {
    try {
      return await authAPI.signUp(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

// Logout
const logOut = createAsyncThunk<any, undefined, { rejectValue: APIError }>(
  'auth/sign-out',
  async (_, { rejectWithValue }) => {
    try {
      return await authAPI.logOut()
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const authThunkActions = {
  signIn,
  signUp,
  logOut,
}

export default authThunkActions
