import { View, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { getDoc } from 'firebase/firestore'

import GoBack from '../components/Common/go-back'
import { Product } from 'features/product/types'
import { Brands } from 'features/brand/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'
import ProductImages from '../components/Product/product-images'
import ProductInfo from '../components/Product/product-info'
import ProductDetails from '../components/Product/product-details'
import ProductReview from '../components/Product/product-review'

const ProductScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [brandData, setBrandData] = useState<Brands | null>(null)
  const {
    params: { name, details, images, price, rating, material, colors, type, slug, form, id, status, brand },
  } = useRoute<RouteProp<{ params: Product }>>()
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const fetchBrand = async () => {
    const doc = await getDoc(brand)
    setBrandData(doc.data() as Brands)
  }
  useEffect(() => {
    fetchBrand()
  }, [])

  return (
    <SafeAreaView className="relative flex-1">
      <ScrollView className="flex-1">
        <GoBack />
        <ProductImages images={images} />
        <View className="px-4 py-5">
          <ProductInfo
            brandData={brandData as Brands}
            name={name}
            price={price}
            type={type}
            colors={colors}
            rating={rating as number}
            status={status as string}
          />
          <ProductDetails details={details} />
          <ProductReview />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductScreen
