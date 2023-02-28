import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useNavigation } from '@react-navigation/native'
import { PlusCircleIcon, PlusIcon, StarIcon } from 'react-native-heroicons/solid'
import { Product } from 'features/product/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../configs/screen'
import { Brands } from '../../features/brand/types'

interface AllProductProps {
  products: Product[]
  isAdminUser: boolean
  brand: Brands
}

const AllProduct: React.FC<AllProductProps> = ({ products, isAdminUser, brand }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="py-3">
      <View className="flex-row items-center mb-4">
        <Text className="font-bold text-md mr-3">Tất cả sản phẩm</Text>
        {isAdminUser && (
          <Pressable onPress={() => navigation.navigate('CreateProduct', { ...brand })}>
            <PlusCircleIcon color="#00CCBB" size={30} />
          </Pressable>
        )}
      </View>
      <FlatList
        contentContainerStyle={{ marginBottom: 10 }}
        data={products}
        scrollEnabled
        numColumns={2}
        horizontal={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="w-[48%] mr-3 mb-3">
            <TouchableOpacity onPress={() => navigation.navigate('Product', { ...item, brand })}>
              <View key={item?.id} className="bg-white rounded-md shadow-sm w-full">
                <Image
                  source={{
                    uri: item?.images[0],
                  }}
                  className="w-full h-40 rounded-t-md"
                />
                <View className="p-3">
                  <Text className="font-bold mb-2">{item?.name}</Text>
                  <Text className="text-sm mb-2">
                    Price:
                    <Text className="text-gray-700">
                      &nbsp;&nbsp;
                      <Currency quantity={item?.price} currency="VND" />
                    </Text>
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <Text className="text-gray-700 text-sm mr-2">{item?.rating}</Text>
                    <StarIcon color="orange" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
  )
}

export default AllProduct
