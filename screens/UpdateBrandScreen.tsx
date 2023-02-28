import { View, Text, Alert, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useAppDispatch, useAppSelector } from '../store'
import { RootStackParamList } from 'configs/screen'
import { Brands, CreateBrandParams } from 'features/brand/types'
import uploadThunkActions from '../features/upload/uploadAction'
import { convertImageUrlToBlob } from '../configs/image'
import brandThunkActions from '../features/brand/brandAction'
import { Timestamp } from '@firebase/firestore'
import { cloneDeep } from 'lodash'
import useInputs from '../hooks/useInputs'
import { createBrandInputs } from '../configs/inputs'
import { selectUpdateBrandLoading } from '../features/brand/brandSlice'
import LoadingButton from '../components/Common/loading-button'

interface UpdateBrandScreenProps {}

const UpdateBrandScreen: React.FC<UpdateBrandScreenProps> = () => {
  const {
    params: { name, bannerUrl, logoUrl, socials, description, establishTime, type, addresses, phoneNumber, slug, id },
  } = useRoute<RouteProp<{ params: Brands }>>()
  const form = useForm<CreateBrandParams>({
    mode: 'onChange',
  })
  const { watch, handleSubmit, setValue, getValues } = form
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const isLoadingUpdateBrand = useAppSelector(selectUpdateBrandLoading)
  const disabledButton = isLoadingUpdateBrand || !watch('name')
  const updateBrandInputs = createBrandInputs?.map((input) => {
    if (['logoUrl', 'bannerUrl']?.includes(input.name)) {
      return {
        ...input,
        uploadOptions: { ...input?.uploadOptions, defaultImageSrc: getValues(input.name as any) },
      }
    }
    return {
      ...input,
    }
  })

  const handleUploadImages = async () => {
    let newLogoUrl = watch('logoUrl') || ''
    let newBannerUrl = watch('bannerUrl') || ''
    if (watch('logoUrl') && watch('logoUrl') !== logoUrl) {
      console.log('Run here')
      const logoBlob = await convertImageUrlToBlob(watch('logoUrl'))
      const { payload } = await dispatch(
        uploadThunkActions.uploadFileToStorage({ path: `logos/${slug}`, file: logoBlob }),
      )
      newLogoUrl = payload
    }
    if (watch('bannerUrl') && watch('bannerUrl') !== bannerUrl) {
      const bannerBlob = await convertImageUrlToBlob(watch('bannerUrl'))
      const { payload } = await dispatch(
        uploadThunkActions.uploadFileToStorage({ path: `banners/${slug}`, file: bannerBlob }),
      )
      newBannerUrl = payload
    }
    return { logoUrl: newLogoUrl, bannerUrl: newBannerUrl }
  }
  const handleUpdateBrand = () => {
    handleSubmit(async (data) => {
      console.log('Data payload', data)
      const { name, description, establishTime, type, phoneNumber, socials, addresses } = data
      const slug = name?.toLowerCase().replace(' ', '-')
      const { logoUrl: newLogoUrl, bannerUrl: newBannerUrl } = await handleUploadImages()
      const customParams = {
        name,
        description,
        type,
        phoneNumber,
        socials,
        establishTime: Timestamp.fromDate(establishTime),
        logoUrl: newLogoUrl,
        bannerUrl: newBannerUrl as string,
        addresses,
        slug,
      }
      const { meta, payload: payloadBrand } = await dispatch(
        brandThunkActions.updateBrand({ id, data: cloneDeep(customParams) }),
      )
      if (meta.requestStatus === 'fulfilled') {
        console.log('Update brand success', payloadBrand)
        Alert.alert('Update Brand success')
        dispatch(brandThunkActions.getBrands({}))
      } else {
        Alert.alert('Update Brand failure', payloadBrand)
      }
    })()
  }

  const onSetDefaultValues = () => {
    const establishTimeClone = cloneDeep(establishTime) as any
    setValue('name', name)
    setValue('description', description)
    setValue('addresses', addresses)
    setValue('bannerUrl', bannerUrl as string)
    setValue('logoUrl', logoUrl)
    setValue('phoneNumber', phoneNumber as string)
    setValue('socials', socials)
    setValue('establishTime', establishTimeClone?.toDate())
    setValue('type', type)
  }

  useEffect(() => {
    onSetDefaultValues()
  }, [])
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex-col items-center py-6 mt-3">
          {renderInputs({ inputs: updateBrandInputs })}
          <View className="w-3/4 flex-col mt-3">
            <LoadingButton onSubmit={handleUpdateBrand} disabled={disabledButton} loading={isLoadingUpdateBrand} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

export default UpdateBrandScreen
