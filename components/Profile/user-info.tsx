import { View, Text, Image } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'

const UserInfo = () => {
  const user = getAuth()?.currentUser
  return (
    <View className="bg-white shadow-sm rounded-md h-[120px] mb-5 px-4 flex-row items-center">
      <View className="mr-4">
        <Image
          source={{
            uri: user?.photoURL
              ? user?.photoURL
              : 'https://firebasestorage.googleapis.com/v0/b/brand-review-cf503.appspot.com/o/logos%2Favt-default.jpeg?alt=media&token=87ddaedd-c581-4ded-acf8-f4ad898e7dac',
          }}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View>
        <Text className="text-lg font-bold mb-1">{user?.displayName || 'No Name'}</Text>
        <Text className="mb-1">{user?.email}</Text>
        <Text className="mb-1">{user?.phoneNumber || 'No phone number'}</Text>
        <Text className={`${user?.emailVerified ? 'text-green-500' : 'text-red-500'}`}>
          {user?.emailVerified ? 'Verified' : 'No Verfied'}
        </Text>
      </View>
    </View>
  )
}

export default UserInfo
