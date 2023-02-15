import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import userThunkActions from './userAction'
import { User } from './types'

// Define a type for the slice state
interface UserState {
  getUserAuth: {
    loading: boolean
    data: User | null
    error: string
  }
}

// Define the initial state using that type
const initialState: UserState = {
  getUserAuth: {
    loading: false,
    data: null,
    error: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunkActions.getUserAuth.pending, (state) => {
      state.getUserAuth.loading = true
    })

    builder.addCase(userThunkActions.getUserAuth.fulfilled, (state, action: PayloadAction<User>) => {
      state.getUserAuth.loading = false
      state.getUserAuth.data = action.payload
    })

    builder.addCase(userThunkActions.getUserAuth.rejected, (state, action) => {
      state.getUserAuth.loading = false
      state.getUserAuth.error = action.payload?.message as string
    })
  },
})

export const userAction = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserAuth = (state: RootState) => state.user.getUserAuth.data

export default userSlice.reducer
