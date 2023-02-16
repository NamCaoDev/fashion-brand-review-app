import { View, Text, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import CreateBrand from './create-brand'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'

const MyBrand = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="bg-white shadow-sm rounded-md min-h-[160px] mb-5 px-4 py-3 flex-col">
      <Text className="font-bold text-lg">Your brands</Text>
      <View className="flex-1 flex-col justify-center items-center">
        <Text className="text-gray-700 text-center py-5">Your brands is empty!</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateBrand')
          }}
        >
          <View className="bg-[#00CCBB] w-[200px] h-[44px] rounded-md shadow-sm flex items-center justify-center">
            <Text className="text-white font-bold">Create new brand</Text>
          </View>
        </TouchableOpacity>
      </View>

      <CreateBrand visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  )
}

export default MyBrand
