import { View, Text, TextInput, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../store'
import authThunkActions from '../features/auth/authAction'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'

const SignInScreen = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' })
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const handleSignIn = () => {
    handleSubmit(async (data) => {
      const { meta, payload } = await dispatch(
        authThunkActions.signIn({
          email: data?.email,
          password: data?.password,
        }),
      )
      if (meta.requestStatus === 'rejected') {
        Alert.alert(`Sign in failure ${payload}`)
      } else {
        navigation.navigate('Profile')
      }
    })()
  }
  return (
    <View className="mt-20 px-4 flex-col items-center">
      <Text className="text-3xl font-bold text-[#00CCBB] mb-3">Fashion Brand Review</Text>
      <Text className="text-lg font-bold text-gray-500 w-2/3 text-center mb-3">
        Sign in to create your brand and product easy!
      </Text>
      <View className="w-full flex-col items-center py-5">
        <View className="flex-col w-3/4 mb-4">
          <Text className="mb-2">
            Email Address <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                placeholder="Enter email"
                className="h-[46px] bg-white rounded-md shadow-sm px-3"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
            rules={{ required: 'Please input your email!' }}
          />
          {errors['email'] && <Text className="mt-2 ml-2 text-red-500">{errors?.email?.message as string}</Text>}
        </View>
        <View className="w-3/4 flex-col mb-5">
          <Text className="mb-2">
            Password <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password"
                className="h-[46px] bg-white rounded-md shadow-sm px-3"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
            rules={{ required: 'Please input your password', minLength: 6 }}
          />
          {errors['password'] && <Text className="mt-2 ml-2 text-red-500">{errors?.password?.message as string}</Text>}
        </View>
        <View className="mb-5 flex-row items-center">
          <Text className="mr-1">You have not account yet? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp')
            }}
          >
            <Text className="text-[#00CCBB] font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="w-3/4 flex-col">
          <TouchableOpacity onPress={handleSignIn}>
            <View className="bg-[#00CCBB] rounded-md shadow-sm h-[42px] flex items-center justify-center">
              <Text className="text-white font-bold">Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignInScreen
