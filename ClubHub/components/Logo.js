import React, { memo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';

const Logo = () => (
  <Image width={Dimensions.get('window').width} resizeMode='contain' source={require('../assets/logo.png')} style={styles.image}/>
);

const styles = StyleSheet.create({
  image: {
    marginBottom: 0,
    alignSelf: 'center',
    flex: 3
  },
});

export default memo(Logo);