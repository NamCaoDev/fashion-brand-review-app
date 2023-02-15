import { View, Dimensions, StyleSheet, Platform } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import React, { useRef } from 'react'

const { width: screenWidth } = Dimensions.get('window')

interface ProductImagesProps {
  images: string[]
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const carouselRef = useRef<any>(null)

  const goForward = () => {
    carouselRef.current.snapToNext()
  }
  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    )
  }
  return (
    <View className="relative w-full h-64">
      <Carousel
        vertical={false}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 120,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
})

export default ProductImages
