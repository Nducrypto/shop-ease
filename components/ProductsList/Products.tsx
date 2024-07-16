import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Card from '../Card/Card';

const {width} = Dimensions.get('screen');
interface Props {
  product?: any;
  horizontal?: any;
  full?: any;
  style?: any;
  priceColor?: any;
  imageStyle?: any;
  key: number;
}
const Products = ({product, horizontal, full, key, style}: Props) => {
  const navigation = useNavigation<any>();

  const proceedToProductDetail = () => {
    navigation.navigate('ProductDetail', {
      ...product,
    });
  };

  const imageStyles = [
    // styles.image,
    full
      ? styles.fullImage
      : horizontal
      ? styles.horizontalImage
      : styles.image,
  ];

  return (
    <View style={styles.container} key={key}>
      <Card minHeight={120} maxWidth={width} paddingLeft={0}>
        <View
          style={[
            {...styles.product, flexDirection: horizontal ? 'row' : 'column'},
            styles.shadow,
          ]}>
          <TouchableWithoutFeedback onPress={proceedToProductDetail}>
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image
                source={{
                  uri: product?.image[0],
                  // uri: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?fit=crop&w=240&q=80',
                }}
                style={imageStyles}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={proceedToProductDetail}>
            <View style={styles.productDescription}>
              <Text
                style={{
                  ...styles.productTitle,
                  ...(style && {
                    marginTop: style.top,
                  }),
                }}
                numberOfLines={2}>
                {product?.model}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'grey',
                  fontWeight: '500',
                  ...(style && {
                    marginBottom: style.top,
                    marginTop: style.top,
                  }),
                }}>
                ${product?.price}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </View>
  );
};

export default Products;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 27,
  },
  product: {
    borderWidth: 0,
  },
  productTitle: {
    fontWeight: 'bold',
    paddingBottom: 6,
    fontSize: 14,
    color: 'black',
  },
  productDescription: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    elevation: 1,
    flex: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 8,
    marginTop: -20,
    height: 120,
    width: 'auto',
  },
  horizontalImage: {
    height: 130,
    width: 'auto',
    marginTop: -32,
    marginHorizontal: 8,
  },
  fullImage: {
    height: 215,
    width: width - 16 * 3,
    marginTop: -27,
    marginHorizontal: 8,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    // elevation: 2,

    backgroundColor: 'transparent',
  },
});
