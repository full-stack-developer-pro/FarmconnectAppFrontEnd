import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { ImageSlider } from "react-native-image-slider-banner";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Slider = () => {
  return (
    <ImageSlider
      data={[
        { img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/slide2.png' },
        { img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/slide4.png' },
        { img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/slide3.png' },

      ]}
      autoPlay={true}

      closeIconColor="#fff"
      caroselImageContainerStyle={styles.imgStyle}
    />
  )
}

export default Slider

const styles = StyleSheet.create({
  imgStyle: {
    height: height * 1 / 7,
    width: 933,
    // marginHorizontal:5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor:'aqua'
  }
})