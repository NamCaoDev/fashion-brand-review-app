import { View, Text, Alert, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { XCircleIcon } from 'react-native-heroicons/solid'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'configs/screen'
import { useAppDispatch } from '../../store'
import brandThunkActions from '../../features/brand/brandAction'

interface DeleteBrandModalProps {
  visible: boolean
  onClose: () => void
  brandId: string
}

const DeleteBrandModal: React.FC<DeleteBrandModalProps> = ({ visible, onClose, brandId }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()
  const handleDeleteBrand = async () => {
    const { meta } = await dispatch(brandThunkActions.deleteBrand({ id: brandId }))
    if (meta.requestStatus === 'fulfilled') {
      Alert.alert('Delete this brand success, Please back to home page')
      navigation.navigate('Home')
    }
  }
  return (
    <Modal style={{ zIndex: 1000 }} animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="w-3/4 relative">
          <View className="absolute top-5 right-5 z-10">
            <TouchableOpacity onPress={onClose}>
              <XCircleIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <Text className="font-bold text-lg text-left mb-4">Delete this Brand</Text>
          <View className="flex-row items-center space-x-3 mt-5">
            <Pressable
              className="bg-[#00CCBB] h-[40px] rounded-lg flex items-center justify-center flex-1"
              onPress={handleDeleteBrand}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              className="bg-[#00CCBB] h-[40px] rounded-lg flex items-center justify-center flex-1"
              onPress={onClose}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
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

export default DeleteBrandModal
