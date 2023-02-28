import { View, SafeAreaView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
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
import { useAppSelector } from '../store'
import { selectAuthData } from '../features/auth/authSlice'
import { getAuth } from 'firebase/auth'
import { selectUserAuth } from '../features/user/userSlice'

const ProductScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  // const [brandData, setBrandData] = useState<Brands | null>(null)
  const {
    params: { name, details, images, price, rating, material, colors, type, slug, form, id, status, brand, technology },
  } = useRoute<RouteProp<{ params: Product }>>()
  // const isFocused = useIsFocused()
  const authData = useAppSelector(selectAuthData)
  const user = getAuth()?.currentUser || authData?.authInfo
  const userAuth = useAppSelector(selectUserAuth)
  const isAdminUser: boolean = userAuth?.role === 'admin' && user
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  // const fetchBrand = async () => {
  //   console.log('Handle brand', brand)
  //   const doc = await getDoc(brand)
  //   setBrandData(doc.data() as Brands)
  // }
  // useEffect(() => {
  //   if (isFocused) {
  //     fetchBrand()
  //   }
  // }, [isFocused])

  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-9' : 'mt-0'} relative flex-1`}>
      <ScrollView className="flex-1">
        <GoBack />
        <ProductImages images={images} />
        <View className="px-4 py-5">
          <ProductInfo
            brandData={brand as Brands}
            name={name}
            price={price}
            type={type}
            colors={colors}
            rating={rating as number}
            status={status as string}
            id={id}
            form={form}
            slug={slug}
            material={material}
            details={details}
            images={images}
            isAdminUser={isAdminUser}
            technology={technology as string}
          />
          <ProductDetails details={details} />
          <ProductReview />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductScreen
