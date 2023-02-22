import { View, Text, TextInput, StyleSheet, Platform, Pressable, TouchableOpacity } from 'react-native'
import React, { cloneElement, isValidElement, useState } from 'react'
import { UseFormReturn, Controller, useFieldArray, FieldValues } from 'react-hook-form'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { InputParams, InputType, SelectOptions } from '../models/input'
import { cloneDeep } from 'lodash'
import UploadButton from '../components/Common/upload-button'
import { PlusIcon, XCircleIcon } from 'react-native-heroicons/solid'

interface UseInputsProps {
  form: UseFormReturn<any>
}

const useInputs = ({ form }: UseInputsProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'addresses',
  })
  const [showDatePopup, setShowDatePopup] = useState(false)
  const renderError = (error: string) => {
    if (error) {
      return <Text className="mt-2 ml-2 text-red-500">{error}</Text>
    }
    return null
  }
  const renderInputs = (inputs: InputParams[]) =>
    inputs?.map((input: InputParams, index: number) => {
      const { name, type, label, placeholder, required, selectOptions, groups, uploadOptions, icon } = input
      const isTextInput = type === InputType.Text
      const isEmailInput = type === InputType.Email
      const isPasswordInput = type === InputType.Password
      const isTextAreaInput = type === InputType.TextArea
      const isSelect = type === InputType.Select
      const isInputGroup = type === InputType.InputGroup
      const isInputList = type === InputType.InputList
      const isDatePicker = type === InputType.Date
      const isUploadInput = type === InputType.Upload
      return (
        <View className="w-3/4 flex-col mb-5" key={index}>
          {label && (
            <Text className="mb-2">
              {label} {required && <Text className="text-red-500">*</Text>}
            </Text>
          )}
          {(isTextInput || isPasswordInput || isEmailInput || isTextAreaInput) && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center">
                  {isValidElement(icon) ? cloneElement(icon) : null}
                  <TextInput
                    secureTextEntry={isPasswordInput ? true : false}
                    autoCapitalize="none"
                    placeholder={placeholder}
                    className={`h-[46px] ${icon ? 'ml-3' : 'ml-0'}`}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name={name}
              rules={{ required: required ? `Please input your ${label}!` : false }}
            />
          )}
          {isSelect && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RNPickerSelect
                  onValueChange={onChange}
                  value={value}
                  items={cloneDeep(selectOptions as SelectOptions[])}
                  style={{ ...pickerSelectStyles }}
                />
              )}
              name={name}
              rules={{ required: required ? `Please input your ${label}!` : false }}
            />
          )}
          {isDatePicker && (
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
                      {watch(name) && (
                        <Text className="py-2 font-bold">Date: {moment(watch(name)).format('DD-MM-YYYY')}</Text>
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
              name={name}
              rules={{ required: required ? `Please input your ${label}` : false }}
            />
          )}
          {isUploadInput && (
            <UploadButton
              onFinish={(imageUrl) => setValue(name, imageUrl)}
              isAvatar={Boolean(uploadOptions?.isAvatar)}
            />
          )}
          {isInputGroup && renderInputs(groups as InputParams[])}
          {isInputList && (
            <>
              {fields?.map((field, index) => (
                <Controller
                  key={index}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="relative">
                      <TextInput
                        autoCapitalize="none"
                        placeholder={placeholder}
                        className="h-[46px] bg-white rounded-md shadow-sm px-3 mb-3"
                        onChangeText={(value) => onChange(value)}
                        onBlur={onBlur}
                        value={watch(name)?.[index]}
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
                  name={`${name}.${index}`}
                />
              ))}
              <TouchableOpacity onPress={() => append('')}>
                <View className="h-[40px] w-full mt-2 rounded-md border border-gray-700 border-dashed flex-row items-center justify-center">
                  <PlusIcon size={20} color="#00CCBB" />
                  <Text className="text-gray-700 ml-2">Add new {label}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {renderError(errors[name]?.message as string)}
        </View>
      )
    })
  return {
    renderInputs,
  }
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

export default useInputs
