import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid'
import { Product } from 'features/product/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../configs/screen'

interface AllProductProps {
  products: Product[]
}

const AllProduct: React.FC<AllProductProps> = ({ products }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="py-3">
      <Text className="font-bold text-md mb-4">Tất cả sản phẩm</Text>
      <FlatList
        data={products}
        scrollEnabled
        numColumns={2}
        horizontal={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Product', item)}>
              <View key={item?.id} className="bg-white rounded-md shadow-sm w-48">
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
          </>
        )}
      ></FlatList>
    </View>
  )
}

export default AllProduct
