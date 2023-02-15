import { View, Text } from 'react-native'
import React from 'react'

interface ProductDetailsProps {
  details: string[]
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
  return (
    <View className="mt-4 bg-white shadow-md rounded-md p-4">
      <Text className="text-md font-bold">Details</Text>
      <View className="mt-3">
        {details?.map((detail, index) => (
          <Text key={index} className="py-2 text-gray-700">
            - {detail}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default ProductDetails
