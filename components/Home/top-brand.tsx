import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Brands } from 'features/brand/types'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../configs/screen'

interface TopBrandProps extends Brands {}

const TopBrand: React.FC<TopBrandProps> = ({
  name,
  logoUrl,
  type,
  id,
  socials,
  description,
  establishTime,
  bannerUrl,
  products,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Brand', {
          id,
          name,
          description,
          socials,
          establishTime,
          logoUrl,
          type,
          bannerUrl,
          products,
        })
      }
    >
      <View className="relative w-40 bg-gray-300 shadow-sm p-4 rounded-md mr-3 flex-col justify-center items-center">
        <Image
          source={{
            uri: logoUrl,
          }}
          className="w-20 h-20 rounded-full mb-3"
        />
        <Text className="text-md font-bold">{name}</Text>
        <View className="absolute top-1 right-1 bg-[#00CCBB] px-2 py-1 rounded-lg">
          <Text className="text-xs">{type === 'local_brand' ? 'local' : 'global'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TopBrand
