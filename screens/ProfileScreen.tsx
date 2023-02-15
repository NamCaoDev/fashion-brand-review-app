import { SafeAreaView, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen
