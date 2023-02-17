import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { ArrowUpOnSquareIcon, XCircleIcon } from 'react-native-heroicons/solid'

interface UploadButtonProps {
  back?: boolean
  onFinish?: (asset: string) => void
  onRemove?: () => void
  placeholder?: string
  isAvatar?: boolean
}

const UploadButton: React.FC<UploadButtonProps> = ({ back, onFinish, onRemove, placeholder, isAvatar }) => {
  const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset[]>(
    placeholder ? [{ uri: placeholder, width: 200, height: 200 }] : [],
  )
  const onOpenLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('Result image', result)
    if (result.assets && !result.canceled) {
      if (result.assets[0].uri) onFinish?.(result.assets[0].uri)
      setAssets(result.assets)
    }
  }

  const heightImage = isAvatar ? 150 : 200
  const widthImage = isAvatar ? 200 : 200
  return (
    <TouchableOpacity onPress={onOpenLibrary}>
      <View
        className={`!h-[${isAvatar ? 150 : 200}px] !w-${isAvatar ? '[150px]' : 'full'} bg-white ${
          isAvatar ? 'rounded-full' : 'rounded-lg'
        } shadow-sm flex items-center justify-center relative`}
      >
        {assets.length || placeholder ? (
          <Image
            style={{ width: widthImage, height: heightImage, maxWidth: '100%' }}
            source={{ uri: assets?.[0]?.uri || placeholder }}
            resizeMode="cover"
            className={isAvatar ? 'rounded-full' : 'rounded-0'}
          />
        ) : (
          <View className="flex-col items-center">
            <ArrowUpOnSquareIcon size={40} color="#00CCBB" />
            <Text className={`font-bold ${isAvatar ? 'text-md' : 'text-lg'} mt-3`}>Upload image</Text>
          </View>
        )}
        {(assets.length !== 0 || placeholder) && (
          <View className="absolute top-0 right-0 w-[24px] h-[24px] rounded-lg z-10">
            <TouchableOpacity
              onPress={() => {
                setAssets([])
                onRemove?.()
              }}
            >
              <XCircleIcon size={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default UploadButton
