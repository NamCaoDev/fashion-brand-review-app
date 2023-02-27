import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Currency from 'react-currency-formatter'
import { StarIcon } from 'react-native-heroicons/solid'

import { Product } from 'features/product/types'
import { getDoc } from 'firebase/firestore'
import { Brands } from 'features/brand/types'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'

interface TopProductProps extends Product {}

const TopProduct: React.FC<TopProductProps> = ({
  name,
  images,
  price,
  brand,
  rating,
  id,
  details,
  material,
  colors,
  type,
  slug,
  technology,
  form,
  status,
}) => {
  const [brandData, setBrandData] = useState<Brands | null>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const fetchBrand = async () => {
    const doc = await getDoc(brand)
    setBrandData(doc.data() as Brands)
  }
  useEffect(() => {
    fetchBrand()
  }, [])
  const cloneBrandData = { ...brandData } as Brands
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Product', {
          name,
          details,
          images,
          material,
          price,
          type,
          brand,
          status,
          slug,
          colors,
          technology,
          id,
          form,
          rating,
        })
      }
    >
      <View className="bg-gray-200 rounded-lg w-50 h-48 flex-row w-full shadow-md mb-4">
        <Image
          source={{
            uri: images[3],
          }}
          className="w-48 h-full rounded-md"
        />
        <View className="flex-1 px-4 py-2">
          <Text className="text-lg font-bold mb-2 h-[54px]">{name?.slice(0, 20).concat('...')}</Text>
          <Text className="text-sm mb-2">
            Price:
            <Text className="text-gray-700">
              &nbsp;&nbsp;
              <Currency quantity={price} currency="VND" />
            </Text>
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-700 text-sm mr-2">{rating}</Text>
            <StarIcon color="orange" />
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-700 text-sm mr-2">Own by:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Brand', cloneBrandData)
              }}
            >
              <Text className="text-[#00CCBB]">{brandData?.name}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View className="flex-row items-center mb-2">
              <Text className="text-orange-500 text-sm mr-2">View product details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TopProduct
