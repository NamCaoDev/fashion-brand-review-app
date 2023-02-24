import { View, Alert, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../store'
import { CreateBrandParams } from 'features/brand/types'
import uploadThunkActions from '../features/upload/uploadAction'
import { convertImageUrlToBlob } from '../configs/image'
import brandThunkActions from '../features/brand/brandAction'
import { Timestamp } from '@firebase/firestore'
import useInputs from '../hooks/useInputs'
import { createBrandInputs } from '../configs/inputs'
import { cloneDeep } from 'lodash'
import LoadingButton from '../components/Common/loading-button'
import { selectCreateBrandLoading } from '../features/brand/brandSlice'

const CreateBrandScreen = () => {
  const form = useForm<CreateBrandParams>({ mode: 'onChange' })
  const { handleSubmit } = form
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const isLoadingCreateBrand = useAppSelector(selectCreateBrandLoading)
  const disabledButton = isLoadingCreateBrand
  const handleCreateBrand = () => {
    handleSubmit(async (data) => {
      console.log('Data payload', data)
      const { name, description, establishTime, type, phoneNumber, socials, logoUrl, bannerUrl, addresses } = data
      const slug = name?.toLowerCase().replace(' ', '-')
      const imagesBlob = await Promise.all([convertImageUrlToBlob(logoUrl), convertImageUrlToBlob(bannerUrl)])
      const uploadParams = [
        {
          path: `logos/${slug}`,
          file: imagesBlob[0],
        },
        {
          path: `banners/${slug}`,
          file: imagesBlob[1],
        },
      ]
      const { meta, payload } = await dispatch(uploadThunkActions.uploadMultipleFilesToStorage(uploadParams))
      if (meta.requestStatus === 'fulfilled') {
        const newLogoUrl = payload[0]
        const newBannerUrl = payload[1]
        const customParams = {
          name,
          description,
          type,
          phoneNumber,
          socials,
          establishTime: Timestamp.fromDate(establishTime),
          logoUrl: newLogoUrl,
          bannerUrl: newBannerUrl,
          addresses,
        }
        const { meta, payload: payloadBrand } = await dispatch(brandThunkActions.createBrand({ ...customParams, slug }))
        if (meta.requestStatus === 'fulfilled') {
          console.log('Create brand success', payloadBrand)
          Alert.alert('Create Brand success')
        } else {
          Alert.alert('Create Brand failure', payloadBrand)
        }
      }
    })()
  }

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled>
        <View className="w-full flex-col items-center py-6 mt-3">
          {renderInputs({ inputs: cloneDeep(createBrandInputs), level: 0 })}

          <View className="w-3/4 flex-col mt-3">
            <LoadingButton onSubmit={handleCreateBrand} disabled={disabledButton} loading={isLoadingCreateBrand} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateBrandScreen
