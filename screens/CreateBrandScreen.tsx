import { View, Text, TextInput, Alert, StyleSheet, SafeAreaView, ScrollView, Image, Platform } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../store'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'
import { socialsIconUri } from '../configs/url'
import UploadButton from '../components/Common/upload-button'
import { CreateBrandParams } from 'features/brand/types'
import uploadThunkActions from '../features/upload/uploadAction'
import { convertImageUrlToBlob } from '../configs/image'
import brandThunkActions from '../features/brand/brandAction'

const CreateBrandScreen = () => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateBrandParams>({ mode: 'onChange' })
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  console.log(errors, 'Errors')
  const handleCreateBrand = () => {
    handleSubmit(async (data) => {
      console.log('Data payload', data)
      const { name, description, establishTime, type, phoneNumber, socials, logoUrl, bannerUrl } = data
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
          establishTime,
          logoUrl: newLogoUrl,
          bannerUrl: newBannerUrl,
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
      <ScrollView>
        <View className="w-full flex-col items-center py-6 mt-3">
          <View className="flex-col w-3/4 mb-4">
            <Text className="mb-2">
              Name <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  placeholder="Enter your name"
                  className="h-[46px] bg-white rounded-md shadow-sm px-3"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: 'Please input your name!' }}
            />
            {errors['name'] && <Text className="mt-2 ml-2 text-red-500">{errors?.name?.message as string}</Text>}
          </View>
          <View className="flex-col w-3/4 mb-4">
            <Text className="mb-2">
              Description <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  placeholder="Enter description"
                  className="h-[46px] bg-white rounded-md shadow-sm px-3"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="description"
              rules={{ required: 'Please input your email!' }}
            />
            {errors['description'] && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.description?.message as string}</Text>
            )}
          </View>
          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Establish Time <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter establish time"
                  className="h-[46px] bg-white rounded-md shadow-sm px-3"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="establishTime"
              rules={{ required: 'Please input your estimate time' }}
            />
            {errors['establishTime'] && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.establishTime?.message as string}</Text>
            )}
          </View>
          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Phone Number <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter phone number"
                  className="h-[46px] bg-white rounded-md shadow-sm px-3"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="phoneNumber"
              rules={{
                required: 'Please input your phone number',
              }}
            />
            {errors['phoneNumber'] && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.phoneNumber?.message as string}</Text>
            )}
          </View>

          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Brand Type <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RNPickerSelect
                  onValueChange={onChange}
                  value={value}
                  items={[
                    { label: 'Local Brand', value: 'local_brand' },
                    { label: 'Global Brand', value: 'global_brand' },
                  ]}
                  style={{ ...pickerSelectStyles }}
                />
              )}
              name="type"
              rules={{
                required: 'Please input your brand type',
              }}
            />
            {errors['type'] && <Text className="mt-2 ml-2 text-red-500">{errors?.type?.message as string}</Text>}
          </View>

          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Socials <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center">
                  <Image source={{ uri: socialsIconUri?.facebook }} className="h-5 w-5 rounded-full" />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter facebook url"
                    className="h-[46px] ml-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="socials.facebook"
              rules={{
                required: 'Please input your facebook url',
              }}
            />
            {errors?.socials?.facebook && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.socials?.facebook?.message as string}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center mt-3">
                  <Image source={{ uri: socialsIconUri?.instagram }} className="h-5 w-5 rounded-full" />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter instagram url"
                    className="h-[46px] ml-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="socials.instagram"
              rules={{
                required: 'Please input your instagram',
              }}
            />
            {errors?.socials?.['instagram'] && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.socials?.['instagram'].message as any}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center mt-3">
                  <Image source={{ uri: socialsIconUri?.tiktok }} className="h-5 w-5 rounded-full" />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter tiktok url"
                    className="h-[46px] ml-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="socials.tiktok"
              rules={{
                required: 'Please input your tiktok',
              }}
            />
            {errors?.socials?.tiktok && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.socials?.tiktok?.message as string}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center mt-3">
                  <Image source={{ uri: socialsIconUri?.shopee }} className="h-5 w-5 rounded-full" />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter shopee url"
                    className="h-[46px] ml-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="socials.shopee"
              rules={{
                required: 'Please input your shopee',
              }}
            />
            {errors?.socials?.shopee && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.socials?.shopee?.message as string}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center mt-3">
                  <Image source={{ uri: socialsIconUri?.website }} className="h-5 w-5 rounded-full" />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter website url"
                    className="h-[46px] ml-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="socials.website"
              rules={{
                required: 'Please input your website',
              }}
            />
            {errors?.socials?.website && (
              <Text className="mt-2 ml-2 text-red-500">{errors?.socials?.website?.message as string}</Text>
            )}
          </View>
          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Logo <Text className="text-red-500">*</Text>
            </Text>
            <UploadButton onFinish={(logoUrl) => setValue('logoUrl', logoUrl)} isAvatar />
          </View>

          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Banner <Text className="text-red-500">*</Text>
            </Text>
            <UploadButton onFinish={(bannerUrl) => setValue('bannerUrl', bannerUrl)} />
          </View>

          <View className="w-3/4 flex-col mt-3">
            <TouchableOpacity onPress={handleCreateBrand}>
              <View className="bg-[#00CCBB] rounded-md shadow-sm h-[42px] flex items-center justify-center">
                <Text className="text-white font-bold">Submit</Text>
              </View>
            </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
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

export default CreateBrandScreen
