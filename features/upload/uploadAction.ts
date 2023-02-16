import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import uploadAPI from './uploadApi'
import { UploadParams } from './types'

// Upload File
const uploadFileToStorage = createAsyncThunk<any, UploadParams, { rejectValue: APIError }>(
  'upload/upload-file',
  async (params, { rejectWithValue }) => {
    try {
      return await uploadAPI.uploadFileToStorage(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

// Upload Multiple file
const uploadMultipleFilesToStorage = createAsyncThunk<any, UploadParams[], { rejectValue: APIError }>(
  'upload/upload-multiple-files',
  async (params, { rejectWithValue }) => {
    try {
      return await uploadAPI.uploadMultipleFilesToStorage(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const uploadThunkActions = {
  uploadFileToStorage,
  uploadMultipleFilesToStorage,
}

export default uploadThunkActions
