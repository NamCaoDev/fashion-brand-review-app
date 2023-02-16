import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import brandThunkActions from './brandAction'
import { Brands, GetBrandsResponse } from './types'

// Define a type for the slice state
interface BrandState {
  getBrands: {
    loading: boolean
    data: Brands[]
    error: string
  }
  createBrand: {
    loading: boolean
    data: any
    error: string
  }
}

// Define the initial state using that type
const initialState: BrandState = {
  getBrands: {
    loading: false,
    data: [],
    error: '',
  },
  createBrand: {
    loading: false,
    data: null,
    error: '',
  },
}

export const brandSlice = createSlice({
  name: 'brand',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(brandThunkActions.getBrands.pending, (state) => {
      state.getBrands.loading = true
    })

    builder.addCase(brandThunkActions.getBrands.fulfilled, (state, action: PayloadAction<Brands[]>) => {
      state.getBrands.loading = false
      state.getBrands.data = action.payload
    })

    builder.addCase(brandThunkActions.getBrands.rejected, (state, action) => {
      state.getBrands.loading = false
      state.getBrands.error = action.payload?.message as string
    })

    builder.addCase(brandThunkActions.createBrand.pending, (state) => {
      state.createBrand.loading = true
    })

    builder.addCase(brandThunkActions.createBrand.fulfilled, (state, action: PayloadAction<Brands[]>) => {
      state.createBrand.loading = false
      state.createBrand.data = action.payload
    })

    builder.addCase(brandThunkActions.createBrand.rejected, (state, action) => {
      state.createBrand.loading = false
      state.createBrand.error = action.payload?.message as string
    })
  },
})

export const brandAction = brandSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBrands = (state: RootState) => state.brand.getBrands.data

export default brandSlice.reducer
