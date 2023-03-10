import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TrashIcon } from 'react-native-heroicons/solid'

import { Brands } from 'features/brand/types'
import { RootStackParamList } from 'configs/screen'
import GoBack from '../components/Brand/go-back'
import SocialLists from '../components/Brand/social-lists'
import DetailsBrand from '../components/Brand/details-brand'
import AllProduct from '../components/Brand/all-product'
import { getDoc } from 'firebase/firestore'
import { cloneDeep } from 'lodash'
import { Product } from 'features/product/types'
import { useAppSelector } from '../store'
import { selectUserAuth } from '../features/user/userSlice'
import BrandActionBtn from '../components/Brand/brand-action-btn'
import DeleteBrandModal from '../components/Brand/delete-brand-modal'
import { getAuth } from 'firebase/auth'
import { selectAuthData } from '../features/auth/authSlice'

const BrandScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: {
      name,
      bannerUrl,
      logoUrl,
      socials,
      description,
      products,
      establishTime,
      type,
      addresses,
      phoneNumber,
      slug,
      id,
    },
  } = useRoute<RouteProp<{ params: Brands }>>()

  const [productsData, setProductsData] = useState<Product[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const isFocused = useIsFocused()
  const authData = useAppSelector(selectAuthData)
  const user = getAuth()?.currentUser || authData?.authInfo
  const userAuth = useAppSelector(selectUserAuth)
  const isAdminUser = userAuth?.role === 'admin' && user

  console.log('products', products)

  const getAllProductData = async () => {
    const results = await Promise.all(products?.map((product: any) => getDoc(product)))
    const resultsData: Product[] = results?.map((r) => {
      return { ...r.data(), id: r.id }
    })
    console.log('Result data', resultsData[0].id)
    setProductsData(cloneDeep(resultsData))
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    if (isFocused) {
      getAllProductData()
    }
  }, [isFocused])

  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-9' : 'mt-0'} relative flex-1`}>
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
            <View className="flex-col">
              <Text className="text-lg font-bold mr-3">{name}</Text>
              {isAdminUser && (
                <View className="flex-row items-center mt-2">
                  <BrandActionBtn
                    name={name}
                    description={description}
                    id={id}
                    socials={socials}
                    logoUrl={logoUrl}
                    establishTime={establishTime}
                    type={type}
                    bannerUrl={bannerUrl}
                    products={products}
                    addresses={addresses}
                    phoneNumber={phoneNumber}
                    slug={slug}
                    onCloseDeleteModal={() => setShowDeleteModal(false)}
                    onOpenDeleteModal={() => setShowDeleteModal(true)}
                  />
                  <View className="ml-1">
                    <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                      <TrashIcon color="#cd201f" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <SocialLists socials={socials} />
          </View>
          <Text className="py-4 text-gray-700">{description}</Text>
          <DetailsBrand />
          <AllProduct
            products={productsData}
            isAdminUser
            brand={{
              id,
              name,
              description,
              bannerUrl,
              logoUrl,
              establishTime,
              type,
              addresses,
              phoneNumber,
              slug,
              socials,
            }}
          />
        </View>
        <DeleteBrandModal brandId={id} visible={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default BrandScreen
