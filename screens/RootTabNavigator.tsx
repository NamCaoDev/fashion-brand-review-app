import React, { useEffect } from 'react'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import { Platform, Text } from 'react-native'
import { HomeIcon as HomeOutlinedIcon, UserIcon as UserOutlinedIcon } from 'react-native-heroicons/outline'
import { HomeIcon, UserIcon } from 'react-native-heroicons/solid'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../configs/screen'
import BrandScreen from './BrandScreen'
import ProductScreen from './ProductScreen'
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import CreateBrandScreen from './CreateBrandScreen'
import UpdateBrandScreen from './UpdateBrandScreen'
import CreateProductScreen from './CreateProductScreen'
import userThunkActions from '../features/user/userAction'
import { useAppDispatch, useAppSelector } from '../store'
import { selectAuthData } from '../features/auth/authSlice'
import { getAuth } from 'firebase/auth'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={BrandScreen} name="Brand" />
      <Stack.Screen component={ProductScreen} name="Product" />
      <Stack.Screen component={CreateBrandScreen} name="CreateBrand" options={{ headerTitle: 'Create New Brand' }} />
      <Stack.Screen component={UpdateBrandScreen} name="UpdateBrand" options={{ headerTitle: 'Update Brand' }} />
      <Stack.Screen component={CreateProductScreen} name="CreateProduct" options={{ headerTitle: 'Create Product' }} />
    </Stack.Navigator>
  )
}

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ProfileScreen} name="Profile" options={{ headerTitle: 'Your Profile' }} />
      <Stack.Screen component={SignInScreen} name="SignIn" options={{ headerTitle: 'Sign In' }} />
      <Stack.Screen component={SignUpScreen} name="SignUp" options={{ headerTitle: 'Sign Up' }} />
      <Stack.Screen component={CreateBrandScreen} name="CreateBrand" options={{ headerTitle: 'Create New Brand' }} />
      <Stack.Screen component={UpdateBrandScreen} name="UpdateBrand" options={{ headerTitle: 'Update Brand' }} />
      <Stack.Screen component={CreateProductScreen} name="CreateProduct" options={{ headerTitle: 'Create Product' }} />
    </Stack.Navigator>
  )
}

export default function RootTabNavigator() {
  const dispatch = useAppDispatch()
  const authData = useAppSelector(selectAuthData)
  const user = getAuth()?.currentUser || authData?.authInfo
  const isFocused = useIsFocused()
  useEffect(() => {
    if (user?.uid && isFocused) {
      dispatch(
        userThunkActions.getUserAuth({
          userId: user?.uid,
        }),
      )
    }
  }, [dispatch, user?.uid, isFocused])

  console.log('User', user)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let icon

          if (route.name === 'HomeTab') {
            icon = focused ? <HomeIcon color={color} /> : <HomeOutlinedIcon color={color} />
          } else if (route.name === 'ProfileTab') {
            icon = focused ? <UserIcon color={color} /> : <UserOutlinedIcon color={color} />
          }
          return icon
        },
        tabBarLabel: ({ color }) => <Text>{route.name}</Text>,
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
          paddingBottom: 5,
          borderTopWidth: 1,
        },
        tabBarItemStyle: { paddingBottom: Platform.OS === 'android' ? 10 : 5 },
        tabBarActiveTintColor: '#00CCBB',
        tabBarInactiveTintColor: '#00CCBB',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} />
    </Tab.Navigator>
  )
}
