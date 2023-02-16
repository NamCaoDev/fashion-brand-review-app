import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import userThunkActions from './uploadAction'
import { UploadParams } from './types'

// Define a type for the slice state
interface UploadState {
  uploadFile: {
    loading: boolean
    data: any
    error: string
  }
  uploadMultipleFiles: {
    loading: boolean
    data: any
    error: string
  }
}

// Define the initial state using that type
const initialState: UploadState = {
  uploadFile: {
    loading: false,
    data: null,
    error: '',
  },
  uploadMultipleFiles: {
    loading: false,
    data: null,
    error: '',
  },
}

export const uploadSlice = createSlice({
  name: 'upload',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunkActions.uploadFileToStorage.pending, (state) => {
      state.uploadFile.loading = true
    })

    builder.addCase(userThunkActions.uploadFileToStorage.fulfilled, (state, action) => {
      state.uploadFile.loading = false
      state.uploadFile.data = action.payload
    })

    builder.addCase(userThunkActions.uploadFileToStorage.rejected, (state, action) => {
      state.uploadFile.loading = false
      state.uploadFile.error = action.payload?.message as string
    })

    builder.addCase(userThunkActions.uploadMultipleFilesToStorage.pending, (state) => {
      state.uploadMultipleFiles.loading = true
    })

    builder.addCase(userThunkActions.uploadMultipleFilesToStorage.fulfilled, (state, action) => {
      state.uploadMultipleFiles.loading = false
      state.uploadMultipleFiles.data = action.payload
    })

    builder.addCase(userThunkActions.uploadMultipleFilesToStorage.rejected, (state, action) => {
      state.uploadMultipleFiles.loading = false
      state.uploadMultipleFiles.error = action.payload?.message as string
    })
  },
})

export const uploadAction = uploadSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUploadData = (state: RootState) => state.upload.uploadFile.data

export default uploadSlice.reducer
