import { View, Text, SafeAreaView, Image, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Brands } from 'features/brand/types'
import { RootStackParamList } from 'configs/screen'
import GoBack from '../components/Brand/go-back'
import SocialLists from '../components/Brand/social-lists'
import DetailsBrand from '../components/Brand/details-brand'
import AllProduct from '../components/Brand/all-product'
import { getDoc } from 'firebase/firestore'
import { cloneDeep } from 'lodash'
import { Product } from 'features/product/types'

const BrandScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { name, bannerUrl, logoUrl, socials, description, products },
  } = useRoute<RouteProp<{ params: Brands }>>()

  const [productsData, setProductsData] = useState<Product[]>([])

  const getAllProductData = async () => {
    const productsAction = products?.map((product: any) => getDoc(product))
    const results = await Promise.all(productsAction)
    const resultsData: Product[] = results?.map((r) => r.data())
    setProductsData(cloneDeep(resultsData))
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    getAllProductData()
  }, [])

  return (
    <SafeAreaView className="relative flex-1">
      <ScrollView className="flex-1">
        <GoBack />
        <View className="relative h-64 mb-3">
          <Image
            source={{
              uri: bannerUrl,
            }}
            className="w-full h-56 p-4 bg-gray-300"
          />
          <View className="absolute bottom-0 z-20 left-5 rounded-full p-1 bg-white">
            <Image
              className="w-20 h-20 rounded-full"
              source={{
                uri: logoUrl,
              }}
            />
          </View>
        </View>
        <View className="px-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">{name}</Text>
            <SocialLists socials={socials} />
          </View>
          <Text className="py-4 text-gray-700">{description}</Text>
          <DetailsBrand />
          <AllProduct products={productsData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BrandScreen
