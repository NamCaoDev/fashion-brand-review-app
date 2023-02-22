import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
// ...
import brandReducer from './features/brand/brandSlice'
import productReducer from './features/product/productSlice'
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import uploadReducer from './features/upload/uploadSlice'

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
