import { View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../store'
import { selectBrands } from '../features/brand/brandSlice'
import brandThunkActions from '../features/brand/brandAction'
import productThunkActions from '../features/product/productAction'

import TopBrand from '../components/Home/top-brand'
import { selectProducts } from '../features/product/productSlice'
import TopProduct from '../components/Home/top-product'

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const brands = useAppSelector(selectBrands)
  const products = useAppSelector(selectProducts)

  useEffect(() => {
    dispatch(brandThunkActions.getBrands({}))
    dispatch(productThunkActions.getProducts({}))
  }, [dispatch])

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeAreaView className={`flex-row items-center space-x-2 w-full bg-gray-500`} style={{ height: 120 }}>
          <Image source={require('../assets/logo.jpeg')} className="w-10 h-10 rounded-full ml-3" />
          <Text className="font-bold text-white text-lg">Fashion Brand Review</Text>
        </SafeAreaView>
      ),
    })
  }, [])
  console.log('product', products)
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-5 w-full">
        <View className="justify-between items-center flex-row mb-4">
          <Text className="text-lg font-bold">All Brands</Text>
          <TouchableOpacity>
            <Text className="text-sm text-[#00CCBB]">View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {brands?.map((brand) => (
            <TopBrand
              key={brand.id}
              name={brand?.name}
              description={brand?.description}
              id={brand?.id}
              socials={brand?.socials}
              logoUrl={brand?.logoUrl}
              establishTime={brand?.establishTime}
              type={brand?.type}
              bannerUrl={brand?.bannerUrl}
              products={brand?.products}
            />
          ))}
        </ScrollView>
        <View className="justify-between items-center flex-row mb-4 mt-5">
          <Text className="text-lg font-bold">Top Products</Text>
          <TouchableOpacity>
            <Text className="text-sm text-[#00CCBB]">View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TopProduct
              key={item?.id}
              name={item?.name}
              details={item?.details}
              images={item?.images}
              material={item?.material}
              price={item?.price}
              type={item?.type}
              brand={item?.brand}
              status={item?.status}
              slug={item?.slug}
              colors={item?.colors}
              technology={item?.technology}
              id={item?.id}
              form={item?.form}
              rating={item?.rating}
            ></TopProduct>
          )}
          keyExtractor={(item) => item.id}
        >
          {/* {products?.map((product) => (
            <TopProduct
              key={product?.id}
              name={product?.name}
              details={product?.details}
              images={product?.images}
              material={product?.material}
              price={product?.price}
              type={product?.type}
              brand={product?.brand}
              status={product?.status}
              slug={product?.slug}
              colors={product?.colors}
              technology={product?.technology}
              id={product?.id}
              form={product?.form}
            ></TopProduct>
          ))} */}
        </FlatList>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
