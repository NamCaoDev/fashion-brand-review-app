import { View, SafeAreaView, ScrollView, Alert, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteProp, useRoute } from '@react-navigation/native'

import LoadingButton from '../components/Common/loading-button'
import useInputs from '../hooks/useInputs'
import { createProductInputs } from '../configs/inputs'
import { useAppDispatch, useAppSelector } from '../store'
import { selectCreateProductLoading } from '../features/product/productSlice'
import { CreateProductParams } from '../features/product/types'
import { convertImageUrlToBlob } from '../configs/image'
import uploadThunkActions from '../features/upload/uploadAction'
import productThunkActions from '../features/product/productAction'
import { Brands } from '../features/brand/types'

const UpdateProductScreen = () => {
  const form = useForm<CreateProductParams>()
  const { handleSubmit } = form
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const [loadingUpload, setLoadingUpload] = useState(false)
  const {
    params: { id: brandId, name: brandName, logoUrl: brandLogoUrl },
  } = useRoute<RouteProp<{ params: Brands }>>()
  const isLoadingCreateProduct = useAppSelector(selectCreateProductLoading) || loadingUpload
  const disabledButton = isLoadingCreateProduct || loadingUpload
  const handleCreateProduct = () => {
    handleSubmit(async (data) => {
      const { name, details, price, type, technology, status, colors, material, form, images } = data
      if (images?.length === 0) {
        return
      }
      const slug = name?.toLowerCase().replace(' ', '-')
      setLoadingUpload(true)
      const imagesBlob = await Promise.all(images.map((url) => convertImageUrlToBlob(url)))
      const uploadParams = imagesBlob?.map((image, index) => {
        return {
          path: `products/${slug}/${index}`,
          file: image,
        }
      })
      const { payload, meta } = await dispatch(uploadThunkActions.uploadMultipleFilesToStorage(uploadParams))
      if (meta.requestStatus === 'fulfilled') {
        setLoadingUpload(false)
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
            brandId,
          }),
        )
        Alert.alert('Product successfully')
      } else {
        setLoadingUpload(false)
        Alert.alert('Something went wrong')
      }
    })()
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled>
        <View className="w-full flex-col items-center py-6 mt-3 relative">
          <View className={`w-3/4 flex-col mb-5`}>
            <Text className="mb-2">
              Brand <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center h-[46px]">
              <Image source={{ uri: brandLogoUrl }} className="w-8 h-8 rounded-full mr-3" />
              <Text>{brandName}</Text>
            </View>
          </View>
          {renderInputs({ inputs: createProductInputs })}
          <View className="w-3/4 flex-col mt-3">
            <LoadingButton onSubmit={handleCreateProduct} disabled={disabledButton} loading={isLoadingCreateProduct} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UpdateProductScreen
