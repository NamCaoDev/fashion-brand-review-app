import { View, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import LoadingButton from '../components/Common/loading-button'
import useInputs from '../hooks/useInputs'
import { createProductInputs } from '../configs/inputs'
import { useAppDispatch, useAppSelector } from '../store'
import { selectCreateProductLoading } from '../features/product/productSlice'
import { CreateProductParams } from '../features/product/types'
import { convertImageUrlToBlob } from '../configs/image'
import uploadThunkActions from '../features/upload/uploadAction'
import productThunkActions from '../features/product/productAction'

const CreateProductScreen = () => {
  const form = useForm<CreateProductParams>()
  const { handleSubmit } = form
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const isLoadingCreateProduct = useAppSelector(selectCreateProductLoading)
  const disabledButton = isLoadingCreateProduct
  const handleCreateProduct = () => {
    handleSubmit(async (data) => {
      const { name, details, price, type, technology, status, colors, material, form, images } = data
      if (images?.length === 0) {
        return
      }
      const slug = name?.toLowerCase().replace(' ', '-')
      const imagesBlob = await Promise.all(images.map((url) => convertImageUrlToBlob(url)))
      const uploadParams = imagesBlob?.map((image, index) => {
        return {
          path: `products/${slug}/${index}`,
          file: image,
        }
      })
      const { payload, meta } = await dispatch(uploadThunkActions.uploadMultipleFilesToStorage(uploadParams))
      if (meta.requestStatus === 'fulfilled') {
        dispatch(
          productThunkActions.createProduct({
            name,
            details,
            price,
            type,
            technology,
            status,
            colors,
            material,
            form,
            images: payload,
            slug,
          }),
        )
        Alert.alert('Product successfully')
      }
    })()
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled>
        <View className="w-full flex-col items-center py-6 mt-3 relative">
          {renderInputs({ inputs: createProductInputs })}
          <View className="w-3/4 flex-col mt-3">
            <LoadingButton onSubmit={handleCreateProduct} disabled={disabledButton} loading={isLoadingCreateProduct} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateProductScreen
