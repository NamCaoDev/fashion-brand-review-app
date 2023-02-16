import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import brandAPI from './brandApi'
import { Brands, GetBrandsParams, GetBrandsResponse, CreateBrandParams } from './types'

// Get Brands
const getBrands = createAsyncThunk<Brands[], GetBrandsParams, { rejectValue: APIError }>(
  'brands/get-brands',
  async (params, { rejectWithValue }) => {
    try {
      return await brandAPI.getBrands(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

// Create Brands
const createBrand = createAsyncThunk<any, CreateBrandParams, { rejectValue: APIError }>(
  'brands/create-brand',
  async (params, { rejectWithValue }) => {
    try {
      return await brandAPI.createBrand(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const brandThunkActions = {
  getBrands,
  createBrand,
}

export default brandThunkActions
