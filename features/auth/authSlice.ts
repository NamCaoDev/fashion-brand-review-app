import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import authThunkActions from './authAction'

// Define a type for the slice state
interface AuthState {
  signIn: {
    loading: boolean
    success: boolean
    error: string
  }
  authData: {
    authenticated: boolean
    authInfo: any
  }
  signUp: {
    loading: boolean
    success: boolean
    error: string
  }
  logOut: {
    loading: boolean
    success: boolean
    error: string
  }
}

// Define the initial state using that type
const initialState: AuthState = {
  signIn: {
    loading: false,
    success: false,
    error: '',
  },
  signUp: {
    loading: false,
    success: false,
    error: '',
  },
  authData: {
    authenticated: false,
    authInfo: null,
  },
  logOut: {
    loading: false,
    success: false,
    error: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authThunkActions.signIn.pending, (state) => {
      state.signIn.loading = true
    })

    builder.addCase(authThunkActions.signIn.fulfilled, (state, action) => {
      state.signIn.loading = false
      state.signIn.success = true
      state.authData.authenticated = true
      state.authData.authInfo = action.payload
    })

    builder.addCase(authThunkActions.signIn.rejected, (state, action) => {
      state.signIn.loading = false
      state.signIn.error = action.payload?.message as string
    })

    builder.addCase(authThunkActions.signUp.pending, (state) => {
      state.signUp.loading = true
    })

    builder.addCase(authThunkActions.signUp.fulfilled, (state, action) => {
      state.signUp.loading = false
      state.signUp.success = true
    })

    builder.addCase(authThunkActions.signUp.rejected, (state, action) => {
      state.signUp.loading = false
      state.signUp.error = action.payload?.message as string
    })

    builder.addCase(authThunkActions.logOut.pending, (state) => {
      state.logOut.loading = true
    })

    builder.addCase(authThunkActions.logOut.fulfilled, (state, action) => {
      state.logOut.loading = false
      state.logOut.success = true
      state.authData.authenticated = false
      state.authData.authInfo = null
    })

    builder.addCase(authThunkActions.logOut.rejected, (state, action) => {
      state.logOut.loading = false
      state.logOut.error = action.payload?.message as string
    })
  },
})

export const authAction = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthData = (state: RootState) => state.auth.authData

export default authSlice.reducer
