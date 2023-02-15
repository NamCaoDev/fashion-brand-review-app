import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Currency from 'react-currency-formatter'
import { HeartIcon as HeartOutlinedIcon } from 'react-native-heroicons/outline'
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid'

import { Brands } from 'features/brand/types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'

interface ProductInfoProps {
  brandData: Brands
  name: string
  price: number
  rating: number
  colors: string[]
  type: string
  status: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ brandData, name, price, rating, colors, type, status }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [liked, setLiked] = useState(false)
  const cloneBrandData = { ...brandData } as Brands
  const renderHeart = () => {
    if (liked) {
      return <HeartIcon color="red" onPress={() => setLiked(false)} />
    }
    return <HeartOutlinedIcon color="red" onPress={() => setLiked(true)} />
  }
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-bold text-xl">{name}</Text>
        {renderHeart()}
      </View>
      <View className="mb-3 flex-row items-center">
        <Text className="text-gray-700 text-lg mr-4">
          <Currency quantity={price} currency="VND" />
        </Text>
        <Text className="mr-4"> | </Text>
        <Text className={`capitalize ${status === 'stocking' ? 'text-green-700' : 'text-red-700'}`}>{status}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-gray-700 text-lg mr-2">{rating}</Text>
        <StarIcon color="orange" />
      </View>
      <View className="flex-row items-center mb-1">
        <Text className="text-gray-700 text-md mr-2">Own by</Text>
        <Image source={{ uri: brandData?.logoUrl }} className="w-12 h-12 rounded-full bg-gray-300 mr-2" />
        <TouchableOpacity onPress={() => navigation.navigate('Brand', cloneBrandData)}>
          <Text className="text-[#00CCBB]">{brandData?.name}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mb-3">
        <Text className="text-gray-700 text-md mr-2">Brand type - </Text>
        <Text>{brandData?.type === 'local_brand' ? 'Local Brand' : 'Global Brand'}</Text>
      </View>
      <View className="flex-row items-center mb-3">
        <Text className="text-gray-700 text-md mr-2">Colors - </Text>
        {colors?.map((color: any) => (
          <Text className="capitalize">{color},&nbsp;</Text>
        ))}
      </View>
      <View className="flex-row items-center">
        <Text className="text-gray-700 text-md mr-2">Category type - </Text>
        <Text>{type}</Text>
      </View>
    </View>
  )
}

export default ProductInfo
