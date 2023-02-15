import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import brandAPI from './brandApi'
import { Brands, GetBrandsParams, GetBrandsResponse } from './types'

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

const brandThunkActions = {
  getBrands,
}

export default brandThunkActions
