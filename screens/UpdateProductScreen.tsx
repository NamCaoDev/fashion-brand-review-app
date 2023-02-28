import { View, SafeAreaView, ScrollView, Alert, Text, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteProp, useRoute } from '@react-navigation/native'

import LoadingButton from '../components/Common/loading-button'
import useInputs from '../hooks/useInputs'
import { createProductInputs } from '../configs/inputs'
import { useAppDispatch, useAppSelector } from '../store'
import { selectUpdateProductLoading } from '../features/product/productSlice'
import { CreateProductParams, Product } from '../features/product/types'
import { convertImageUrlToBlob } from '../configs/image'
import uploadThunkActions from '../features/upload/uploadAction'
import productThunkActions from '../features/product/productAction'
import { Brands } from '../features/brand/types'
import { cloneDeep } from 'lodash'

const UpdateProductScreen = () => {
  const form = useForm<CreateProductParams>()
  const { handleSubmit, setValue, watch } = form
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const [loadingUpload, setLoadingUpload] = useState(false)
  const {
    params: { brand, product },
  } = useRoute<RouteProp<{ params: { brand: Brands; product: Product } }>>()
  const slug = watch('name')?.toLowerCase().replace(' ', '-')
  const isLoadingUpdateProduct = useAppSelector(selectUpdateProductLoading) || loadingUpload
  const disabledButton = isLoadingUpdateProduct || loadingUpload
  const updateProductInputs = createProductInputs?.map((input) => {
    if (['images']?.includes(input.name)) {
      return {
        ...input,
        uploadOptions: { ...input?.uploadOptions, multiple: true, placeholderMul: product?.images },
      }
    }
    return {
      ...input,
    }
  })

  const handleUploadImages = async () => {
    let images = watch('images')
    if (product?.images[0] !== watch('images')[0]) {
      setLoadingUpload(true)
      const imagesBlob = await Promise.all(watch('images').map((url) => convertImageUrlToBlob(url)))
      const uploadParams = imagesBlob?.map((image, index) => {
        return {
          path: `products/${slug}/${index}`,
          file: image,
        }
      })
      const { payload, meta } = await dispatch(uploadThunkActions.uploadMultipleFilesToStorage(uploadParams))
      if (meta.requestStatus === 'fulfilled') {
        images = payload
        setLoadingUpload(false)
      }
    }
    return images
  }

  const handleUpdateProduct = () => {
    handleSubmit(async (data) => {
      const { name, details, price, type, technology, status, colors, material, form: formProduct, images } = data
      if (images?.length === 0) {
        return
      }
      const slug = name?.toLowerCase().replace(' ', '-')
      const imagesUpload = await handleUploadImages()
      console.log('Custom params', {
        id: product.id,
        name,
        details,
        price,
        type,
        technology,
        status,
        colors,
        material,
        form: formProduct,
        images: cloneDeep(imagesUpload),
        slug,
      })
      const { meta, payload } = await dispatch(
        productThunkActions.updateProduct({
          id: product.id,
          data: cloneDeep({
            name,
            details,
            price,
            type,
            technology,
            status,
            colors,
            material,
            form: formProduct,
            // images: cloneDeep(imagesUpload),
            slug,
          }),
        }),
      )
      if (meta.requestStatus === 'fulfilled') {
        Alert.alert('Update Product successfully')
      } else {
        Alert.alert('Update Product Failure: ', payload)
      }
    })()
  }

  const onSetDefaultValues = () => {
    const { name, price, type, technology, status, colors, details, material, form, images } = product
    setValue('name', name)
    setValue('price', price)
    setValue('type', type)
    setValue('technology', technology)
    setValue('status', status)
    setValue('colors', colors)
    setValue('details', details)
    setValue('material', material)
    setValue('form', form)
    setValue('images', images)
  }

  useEffect(() => {
    onSetDefaultValues()
  }, [])
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled>
        <View className="w-full flex-col items-center py-6 mt-3 relative">
          <View className={`w-3/4 flex-col mb-5`}>
            <Text className="mb-2">
              Brand <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center h-[46px]">
              <Image source={{ uri: brand?.logoUrl }} className="w-8 h-8 rounded-full mr-3" />
              <Text>{brand?.name}</Text>
            </View>
          </View>
          {renderInputs({ inputs: updateProductInputs })}
          <View className="w-3/4 flex-col mt-3">
            <LoadingButton onSubmit={handleUpdateProduct} disabled={disabledButton} loading={isLoadingUpdateProduct} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UpdateProductScreen
