import { View, TouchableOpacity, Linking, Image, Alert } from 'react-native'
import React from 'react'
import { socialsIconUri } from '../../configs/url'

interface SocialListsProps {
  socials: {
    facebook: string
    instagram: string
    tiktok: string
    shopee: string
    website: string
  }
}

const SocialLists: React.FC<SocialListsProps> = ({ socials }) => {
  const renderImageSrc = (url: string) => {
    if (url.includes('facebook')) {
      return socialsIconUri['facebook']
    } else if (url.includes('instagram')) {
      return socialsIconUri['instagram']
    } else if (url.includes('tiktok')) {
      return socialsIconUri['tiktok']
    } else if (url.includes('shopee')) {
      return socialsIconUri['shopee']
    } else {
      return socialsIconUri['website']
    }
  }
  return (
    <View className="flex-row space-x-2">
      {Object.entries(socials)?.map(([key, value], index) => (
        <TouchableOpacity
          key={index}
          onPress={async () => {
            const supported = await Linking.canOpenURL(value)

            if (supported) {
              // Opening the link with some app, if the URL scheme is "http" the web link should be opened
              // by some browser in the mobile
              await Linking.openURL(value)
            } else {
              Alert.alert(`Don't know how to open this URL: ${value}`)
            }
          }}
        >
          <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center">
            <Image
              source={{
                uri: renderImageSrc(value),
              }}
              className="h-4 w-4 rounded-full"
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SocialLists
