import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ArrowDownIcon, PlusIcon, XCircleIcon } from 'react-native-heroicons/solid'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { useAppDispatch } from '../store'
import { RootStackParamList } from 'configs/screen'
import { socialsIconUri } from '../configs/url'
import UploadButton from '../components/Common/upload-button'
import { CreateBrandParams } from 'features/brand/types'
import uploadThunkActions from '../features/upload/uploadAction'
import { convertImageUrlToBlob } from '../configs/image'
import brandThunkActions from '../features/brand/brandAction'
import { Timestamp } from '@firebase/firestore'
import useInputs from '../hooks/useInputs'
import { createBrandInputs } from '../configs/inputs'
import { cloneDeep } from 'lodash'

const CreateBrandScreen = () => {
  const form = useForm<CreateBrandParams>({ mode: 'onChange' })
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = form
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'addresses',
  })
  const { renderInputs } = useInputs({ form })
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [showDatePopup, setShowDatePopup] = useState(false)
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
      <ScrollView>
        <View className="w-full flex-col items-center py-6 mt-3">
          {renderInputs(cloneDeep(createBrandInputs))}
          {/* <View className="flex-col w-3/4 mb-4">
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
              render={({ field: { onChange, onBlur, value } }) => {
                if (Platform.OS === 'android') {
                  return (
                    <View className="flex-col">
                      <Pressable
                        className="p-3 w-[200px] bg-[#00CCBB] rounded-md flex justify-center items-center"
                        onPress={() => {
                          setShowDatePopup(true)
                        }}
                      >
                        <Text className="text-white font-bold">Choose date</Text>
                      </Pressable>
                      {watch('establishTime') && (
                        <Text className="py-2 font-bold">
                          Date: {moment(watch('establishTime')).format('DD-MM-YYYY')}
                        </Text>
                      )}
                      {showDatePopup && (
                        <DateTimePicker
                          value={value || new Date()}
                          onChange={(e, date) => {
                            setShowDatePopup(false)
                            onChange(date)
                          }}
                          mode="date"
                          positiveButton={{ label: 'OK', textColor: '#00CCBB' }}
                          style={{ flex: 1, justifyContent: 'flex-start' }}
                          display="default"
                        />
                      )}
                    </View>
                  )
                }
                return (
                  <DateTimePicker
                    value={value || new Date()}
                    onChange={(e, date) => {
                      setShowDatePopup(false)
                      onChange(date)
                    }}
                    mode="date"
                    positiveButton={{ label: 'OK', textColor: '#00CCBB' }}
                    style={{ flex: 1, justifyContent: 'flex-start' }}
                    display="default"
                  />
                )
              }}
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
              Addresses <Text className="text-red-500">*</Text>
            </Text>
            {fields?.map((field, index) => (
              <Controller
                key={index}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="relative">
                    <TextInput
                      autoCapitalize="none"
                      placeholder="Enter your name"
                      className="h-[46px] bg-white rounded-md shadow-sm px-3 mb-3"
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={watch('addresses')?.[index]}
                    />
                    <View className="absolute z-10 top-3 right-3">
                      <TouchableOpacity
                        onPress={() => {
                          remove(index)
                        }}
                      >
                        <XCircleIcon size={23} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                name={`addresses.${index}`}
              />
            ))}
            <TouchableOpacity onPress={() => append('')}>
              <View className="h-[40px] w-full mt-2 rounded-md border border-gray-700 border-dashed flex-row items-center justify-center">
                <PlusIcon size={20} color="#00CCBB" />
                <Text className="text-gray-700 ml-2">Add new addresses</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Logo <Text className="text-red-500">*</Text>
            </Text>
            <UploadButton onFinish={(logoUrl) => setValue('logoUrl', logoUrl)} isAvatar={true} />
          </View>

          {!watch('logoUrl') && <Text className="mt-2 ml-2 text-red-500">Please choose a image</Text>}

          <View className="w-3/4 flex-col mb-5">
            <Text className="mb-2">
              Banner <Text className="text-red-500">*</Text>
            </Text>
            <UploadButton onFinish={(bannerUrl) => setValue('bannerUrl', bannerUrl)} />
          </View>

          {!watch('bannerUrl') && <Text className="mt-2 ml-2 text-red-500">Please choose a image</Text>} */}

          <View className="w-3/4 flex-col mt-3">
            <Pressable onPress={handleCreateBrand}>
              <View className="bg-[#00CCBB] rounded-md shadow-sm h-[42px] flex items-center justify-center">
                <Text className="text-white font-bold">Submit</Text>
              </View>
            </Pressable>
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
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

export default CreateBrandScreen
