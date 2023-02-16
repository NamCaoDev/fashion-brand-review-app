import { View, Text, TextInput, Alert, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { XCircleIcon } from 'react-native-heroicons/solid'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import authThunkActions from '../../features/auth/authAction'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'

interface CreateBrandProps {
  visible: boolean
  onClose: () => void
}

const CreateBrand: React.FC<CreateBrandProps> = ({ visible, onClose }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' })
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  console.log(errors, 'Errors')
  const handleSignUp = () => {
    handleSubmit(async (data) => {
      console.log('Da vao day')
      const { meta, payload } = await dispatch(
        authThunkActions.signUp({
          email: data?.email,
          password: data?.password,
          displayName: data?.name,
        }),
      )
      if (meta.requestStatus === 'rejected') {
        Alert.alert(`Sign Up failure ${payload}`)
      } else {
        navigation.navigate('Profile')
      }
    })()
  }
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="w-3/4 relative">
          <View className="absolute top-5 right-5">
            <TouchableOpacity onPress={onClose}>
              <XCircleIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <Text className="font-bold text-lg text-left mb-4">Create new Brand</Text>
          <View className="w-full flex-col items-center py-5">
            <View className="flex-col w-full mb-4">
              <Text className="mb-2">
                Name <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter your name"
                    className="h-[46px]  border-b border-gray-700 rounded-md shadow-sm px-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="name"
                rules={{ required: 'Please input your name!' }}
              />
              {errors['name'] && <Text className="mt-2 ml-2 text-red-500">{errors?.name?.message as string}</Text>}
            </View>
            <View className="flex-col w-full mb-4">
              <Text className="mb-2">
                Email Address <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Enter email"
                    className="h-[46px]  border-b border-gray-700 rounded-md shadow-sm px-3"
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
            <View className="w-full flex-col mb-5">
              <Text className="mb-2">
                Password <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Enter password"
                    className="h-[46px]  border-b border-gray-700 rounded-md shadow-sm px-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: 'Please input your password', minLength: 6 }}
              />
              {errors['password'] && (
                <Text className="mt-2 ml-2 text-red-500">{errors?.password?.message as string}</Text>
              )}
            </View>
            <View className="w-full flex-col mb-5">
              <Text className="mb-2">
                Confirm Password <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Enter confirm password"
                    className="h-[46px]  border-b border-gray-700 rounded-md shadow-sm px-3"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="confirmPassword"
                rules={{
                  required: 'Please input your confirm password',
                  minLength: 6,
                  validate: (value) => (value !== watch('password') ? 'Password do not match' : true),
                }}
              />
              {errors['confirmPassword'] && (
                <Text className="mt-2 ml-2 text-red-500">{errors?.confirmPassword?.message as string}</Text>
              )}
            </View>
          </View>

          <Pressable className="bg-[#00CCBB] h-[40px] rounded-lg flex items-center justify-center" onPress={onClose}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default CreateBrand
