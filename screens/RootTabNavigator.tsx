import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
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

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={BrandScreen} name="Brand" />
      <Stack.Screen component={ProductScreen} name="Product" />
    </Stack.Navigator>
  )
}

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={SignInScreen} name="SignIn" options={{ headerShown: false }} />
      <Stack.Screen component={SignUpScreen} name="SignUp" options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function RootTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let icon

          if (route.name === 'Home') {
            icon = focused ? <HomeIcon color={color} /> : <HomeOutlinedIcon color={color} />
          } else if (route.name === 'Profile') {
            icon = focused ? <UserIcon color={color} /> : <UserOutlinedIcon color={color} />
          }
          return icon
        },
        tabBarLabel: ({ color }) => <Text>{route.name}</Text>,
        tabBarStyle: {
          // height: Platform.OS === 'android' ? TAB_BAR_HEIGHT - 15 : undefined,
          paddingTop: 5,
          paddingBottom: 5,
          borderTopWidth: 1,
        },
        tabBarItemStyle: { paddingBottom: Platform.OS === 'android' ? 10 : 5 },
        tabBarActiveTintColor: '#00CCBB',
        tabBarInactiveTintColor: '#00CCBB',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  )
}
