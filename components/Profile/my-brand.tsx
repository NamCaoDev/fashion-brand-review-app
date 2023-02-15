import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const MyBrand = () => {
  return (
    <View className="bg-white shadow-sm rounded-md min-h-[160px] mb-5 px-4 py-3 flex-col">
      <Text className="font-bold text-lg">Your brands</Text>
      <View className="flex-1 flex-col justify-center items-center">
        <Text className="text-gray-700 text-center py-5">Your brands is empty!</Text>
        <TouchableOpacity>
          <View className="bg-[#00CCBB] w-[200px] h-[44px] rounded-md shadow-sm flex items-center justify-center">
            <Text className="text-white font-bold">Create new brand</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyBrand
