import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { PencilSquareIcon } from 'react-native-heroicons/solid'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../configs/screen'
import { Brands } from 'features/brand/types'
import DeleteBrandModal from './delete-brand-modal'

interface BrandActionBtnProps extends Brands {
  onCloseDeleteModal: () => void
  onOpenDeleteModal: () => void
}

const BrandActionBtn: React.FC<BrandActionBtnProps> = ({
  name,
  description,
  establishTime,
  type,
  addresses,
  socials,
  logoUrl,
  bannerUrl,
  phoneNumber,
  slug,
  id,
  onOpenDeleteModal,
}) => {
  const [showPopover, setShowPopover] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View>
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        placement={PopoverPlacement.BOTTOM}
        from={
          <TouchableOpacity onPress={() => setShowPopover(true)}>
            <PencilSquareIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        }
      >
        <View className="flex-col p-5 w-[200px]">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateBrand', {
                name,
                description,
                establishTime,
                type,
                addresses,
                socials,
                logoUrl,
                bannerUrl,
                phoneNumber,
                slug,
                id,
              })
              setShowPopover(false)
            }}
          >
            <View className="px-3 py-4 border border-gray-700 rounded-md mb-3">
              <Text className="font-bold text-lg text-[#00CCBB]">Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowPopover(false)
            }}
          >
            <View className="px-3 py-4 border border-gray-700 rounded-md">
              <Text className="font-bold text-lg text-red-500">Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>
  )
}

export default BrandActionBtn
