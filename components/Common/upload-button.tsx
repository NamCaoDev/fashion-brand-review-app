import { View, Text, TouchableOpacity, Image, Pressable, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { ImagePicker as ImagePickerMultiple, Asset } from 'expo-image-multiple-picker'
import { ArrowUpOnSquareIcon, XCircleIcon } from 'react-native-heroicons/solid'

interface UploadButtonProps {
  back?: boolean
  onFinish?: (asset: string | string[]) => void
  onRemove?: () => void
  placeholder?: string
  isAvatar?: boolean
  multiple?: boolean
  placeholderMul?: string[]
}

const ImagePickerContainer = ({
  onClosePicker,
  onSavePicker,
}: {
  onClosePicker: () => void
  onSavePicker: (assets: Asset[]) => void
}) => {
  return (
    <View style={styles.imagePickerContainer}>
      <ImagePickerMultiple
        onSave={(assets) => {
          console.log('list assets', assets)
          onSavePicker(assets)
          onClosePicker()
        }}
        onCancel={() => console.log('no permissions or user go back')}
        multiple
        limit={5}
      />
    </View>
  )
}

const UploadButton: React.FC<UploadButtonProps> = ({
  back,
  onFinish,
  onRemove,
  placeholder,
  isAvatar,
  multiple,
  placeholderMul,
}) => {
  const [openMultiple, setOpenMultiple] = useState(false)
  const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset[]>(
    placeholder ? [{ uri: placeholder, width: 200, height: 200 }] : [],
  )
  const [defaultImages, setDefaultImages] = useState<string[]>([])
  const onOpenLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    })
    console.log('Result image', result)
    if (result.assets && !result.canceled) {
      if (result.assets[0].uri) onFinish?.(result.assets[0].uri)
      setAssets(result.assets)
    }
  }

  const heightImage = isAvatar ? 150 : 200
  const widthImage = isAvatar ? 200 : 200

  useEffect(() => {
    if (placeholderMul?.length) {
      setDefaultImages([...placeholderMul])
    }
  }, [placeholderMul])

  if (multiple) {
    return (
      <>
        {assets?.length || defaultImages?.length ? (
          <View>
            <View className="flex-row justify-end mb-4">
              <Pressable
                className="bg-[#00CCBB] w-[150px] h-[40px] rounded-md flex-row items-center justify-center"
                onPress={() => {
                  setAssets([])
                  onRemove?.()
                  setDefaultImages([])
                }}
              >
                <Text className="text-white text-center">Remove all images</Text>
              </Pressable>
            </View>
            {defaultImages?.length ? (
              <>
                <FlatList
                  data={defaultImages}
                  scrollEnabled
                  numColumns={2}
                  horizontal={false}
                  keyExtractor={(item) => item as string}
                  renderItem={({ item }) => (
                    <Image
                      style={{ width: 150, height: 150, maxWidth: '100%' }}
                      source={{ uri: item }}
                      resizeMode="cover"
                      className={isAvatar ? 'rounded-full mr-2 mb-3 shadow-sm' : 'rounded-md mr-2 mb-3 shadow-sm'}
                    />
                  )}
                ></FlatList>
              </>
            ) : (
              <>
                <FlatList
                  data={assets}
                  scrollEnabled
                  numColumns={2}
                  horizontal={false}
                  keyExtractor={(item) => item.assetId as string}
                  renderItem={({ item }) => (
                    <Image
                      style={{ width: 150, height: 150, maxWidth: '100%' }}
                      source={{ uri: item.uri }}
                      resizeMode="cover"
                      className={isAvatar ? 'rounded-full mr-2 mb-3 shadow-sm' : 'rounded-md mr-2 mb-3 shadow-sm'}
                    />
                  )}
                ></FlatList>
              </>
            )}
          </View>
        ) : (
          <Pressable
            className="h-[120px] bg-white flex-col items-center justify-center rounded-md"
            onPress={() => setOpenMultiple(true)}
          >
            <ArrowUpOnSquareIcon size={40} color="#00CCBB" />
            <Text className={`font-bold ${isAvatar ? 'text-md' : 'text-lg'} mt-3`}>Upload image</Text>
          </Pressable>
        )}
        {
          <Modal visible={openMultiple} onRequestClose={() => setOpenMultiple(false)}>
            <ImagePickerContainer
              onClosePicker={() => setOpenMultiple(false)}
              onSavePicker={(assets: Asset[]) => {
                setAssets(assets)
                const assetsUrl = assets.map((asset: Asset) => asset.uri)
                onFinish?.(assetsUrl)
              }}
            />
          </Modal>
        }
      </>
    )
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  openBtn: {
    width: 230,
  },
  imagePickerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: 9,
  },
  cardContainer: {
    width: 330,
    marginTop: 20,
  },
})

export default UploadButton
