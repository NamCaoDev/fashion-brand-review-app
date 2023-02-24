import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import productThunkActions from './productAction'
import { Product } from './types'
import { cloneDeep } from 'lodash'

// Define a type for the slice state
interface ProductState {
  getProducts: {
    loading: boolean
    data: Product[]
    error: string
  }
  createProduct: {
    loading: boolean
    success: boolean
    error: string
  }
}

// Define the initial state using that type
const initialState: ProductState = {
  getProducts: {
    loading: false,
    data: [],
    error: '',
  },
  createProduct: {
    loading: false,
    success: false,
    error: '',
  },
}

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productThunkActions.getProducts.pending, (state) => {
      state.getProducts.loading = true
    })

    builder.addCase(productThunkActions.getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.getProducts.loading = false
      state.getProducts.data = action.payload
    })

    builder.addCase(productThunkActions.getProducts.rejected, (state, action) => {
      state.getProducts.loading = false
      state.getProducts.error = action.payload?.message as string
    })

    // Create product
    builder.addCase(productThunkActions.createProduct.pending, (state) => {
      state.createProduct.loading = true
    })

    builder.addCase(productThunkActions.createProduct.fulfilled, (state, action) => {
      state.createProduct.loading = false
      state.createProduct.success = true
    })

    builder.addCase(productThunkActions.createProduct.rejected, (state, action) => {
      state.createProduct.loading = false
      state.createProduct.error = action.payload?.message as string
    })
  },
})

export const brandAction = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.product.getProducts.data
export const selectCreateProductLoading = (state: RootState) => state.product.createProduct.loading

export default productSlice.reducer
