import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import userAPI from './userApi'
import { User, GetUserParams } from './types'

// Get UserAuth
const getUserAuth = createAsyncThunk<any, GetUserParams, { rejectValue: APIError }>(
  'user/get-user-auth',
  async (params, { rejectWithValue }) => {
    try {
      return await userAPI.getUserAuth(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const userThunkActions = {
  getUserAuth,
}

export default userThunkActions
