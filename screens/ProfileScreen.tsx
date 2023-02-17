import { SafeAreaView, Text, View, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getAuth } from 'firebase/auth'
import { RootStackParamList } from 'configs/screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../store'
import authThunkActions from '../features/auth/authAction'
import UserInfo from '../components/Profile/user-info'
import MyBrand from '../components/Profile/my-brand'
import userThunkActions from '../features/user/userAction'
import { selectUserAuth } from '../features/user/userSlice'
import { selectAuthData } from '../features/auth/authSlice'
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const userAuth = useAppSelector(selectUserAuth)
  const authData = useAppSelector(selectAuthData)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const user = getAuth()?.currentUser || authData?.authInfo
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    if (!user && isFocused) {
      navigation.navigate('SignIn')
    }
  }, [user, isFocused])

  const handleSignOut = async () => {
    const { meta, payload } = await dispatch(authThunkActions.logOut())
    if (meta.requestStatus === 'rejected') {
      Alert.alert(`Sign out error ${payload}`)
    } else {
      navigation.navigate('SignIn')
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-col flex-1 px-4 py-5">
        <UserInfo role={userAuth?.role} />
        {userAuth?.role === 'admin' && <MyBrand />}

        <TouchableOpacity onPress={handleSignOut}>
          <View className="w-1/2 h-[44px] bg-red-500 rounded-lg flex items-center justify-center">
            <Text className="text-white font-bold">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
