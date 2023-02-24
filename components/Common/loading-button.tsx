import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

interface LoadingButtonProps {
  onSubmit: () => void
  loading: boolean
  disabled: boolean
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, onSubmit, disabled }) => {
  const isLoadingDisabled = disabled || loading
  return (
    <Pressable onPress={onSubmit} disabled={disabled}>
      <View
        className={`${
          isLoadingDisabled ? 'bg-gray-600' : 'bg-[#00CCBB]'
        } rounded-md shadow-sm h-[42px] flex items-center justify-center`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#d1d5db" />
        ) : (
          <Text className={`${isLoadingDisabled ? 'text-gray-300' : 'text-white'} font-bold`}>Submit</Text>
        )}
      </View>
    </Pressable>
  )
}

export default LoadingButton
