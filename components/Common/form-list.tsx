import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { PlusIcon, XCircleIcon } from 'react-native-heroicons/solid'

interface FormListProps {
  form: UseFormReturn<any>
  name: string
  label: string
}

const FormList: React.FC<FormListProps> = ({ form, name, label }) => {
  const { control, getValues } = form
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name,
  })
  return (
    <View>
      {fields?.map((field, index) => (
        <Controller
          key={index}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="relative">
              <TextInput
                autoCapitalize="none"
                placeholder={`Enter a ${label}`}
                className="h-[46px] bg-white rounded-md shadow-sm px-3 mb-3"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={getValues(`${name}.${index}`)}
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
    </View>
  )
}

export default FormList
