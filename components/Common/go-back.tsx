import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const GoBack = () => {
  const navigation = useNavigation()
  return (
    <View className="z-10 absolute top-5 left-5">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View className="bg-[#00CCBB] w-10 h-10 rounded-full items-center justify-center">
          <ArrowLeftIcon color="white" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default GoBack
