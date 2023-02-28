import { View, Text, TextInput, StyleSheet, Platform, Pressable, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { UseFormReturn, Controller } from 'react-hook-form'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { InputParams, InputType, SelectOptions } from '../models/input'
import FormList from '../components/Common/form-list'
import { cloneDeep } from 'lodash'
import UploadButton from '../components/Common/upload-button'

interface UseInputsProps {
  form: UseFormReturn<any>
}

const IconInput: React.FC<{ iconUrl: string }> = React.memo(
  ({ iconUrl }) => {
    console.log('Re-render icon 2')
    return iconUrl ? <Image source={{ uri: iconUrl }} className="w-5 h-5 rounded-full" /> : null
  },
  (prevProps, nextProps) => prevProps.iconUrl === nextProps.iconUrl,
)

const useInputs = ({ form }: UseInputsProps) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = form
  const [showDatePopup, setShowDatePopup] = useState(false)
  const renderError = (error: string) => {
    if (error) {
      return <Text className="mt-2 ml-2 text-red-500">{error}</Text>
    }
    return null
  }

  const renderInputs = useCallback(
    ({ inputs, level = 0 }: { inputs: InputParams[]; level?: number }) => {
      console.log('Render input 2')
      return inputs?.map((input: InputParams, index: number) => {
        const { name, type, label, placeholder, required, selectOptions, groups, uploadOptions, iconUrl } = input
        const isTextInput = type === InputType.Text
        const isEmailInput = type === InputType.Email
        const isNumberInput = type === InputType.Number
        const isPasswordInput = type === InputType.Password
        const isTextAreaInput = type === InputType.TextArea
        const isSelect = type === InputType.Select
        const isInputGroup = type === InputType.InputGroup
        const isInputList = type === InputType.InputList
        const isDatePicker = type === InputType.Date
        const isUploadInput = type === InputType.Upload
        return (
          <View className={`w-${level === 0 ? '3/4' : 'full'} flex-col mb-5`} key={index}>
            {label && (
              <Text className="mb-2">
                {label} {required && <Text className="text-red-500">*</Text>}
              </Text>
            )}
            {(isTextInput || isPasswordInput || isEmailInput || isTextAreaInput || isNumberInput) && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="bg-white rounded-md shadow-sm px-3 flex-row items-center">
                    {iconUrl ? <IconInput iconUrl={iconUrl} /> : null}
                    <TextInput
                      secureTextEntry={isPasswordInput ? true : false}
                      autoCapitalize="none"
                      placeholder={placeholder}
                      className={`h-[46px] ${iconUrl ? 'ml-3' : 'ml-0'}`}
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
                      value={value || getValues(name) || new Date()}
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
                placeholder={uploadOptions?.defaultImageSrc}
                onRemove={() => setValue(name, null)}
                multiple={uploadOptions?.multiple}
                placeholderMul={uploadOptions?.placeholderMul}
              />
            )}
            {isInputGroup && renderInputs({ inputs: cloneDeep(groups) as InputParams[], level: 1 })}
            {isInputList && (
              <>
                <FormList form={form} name={name} label={label as string} />
              </>
            )}
            {renderError(errors[name]?.message as string)}
          </View>
        )
      })
    },
    [setValue, renderError, control, getValues],
  )
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
