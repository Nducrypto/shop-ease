import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../Cart/cartStyle';
import Card from '../Card/Card';
import {TouchableWithoutFeedback, Image} from 'react-native';
import {Input} from 'galio-framework';
import globalStyle from '../../constants/globalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useProductState, ProductInterface} from '../recoilState/productState';
import Products from '../ProductsList/Products';

const {width} = Dimensions.get('screen');

const Search = () => {
  const [filteredProduct, setFilteredProduct] = useState<ProductInterface[]>(
    [],
  );
  const [search, setSearch] = useState<string>('');

  const navigation = useNavigation<any>();
  const {allProducts} = useProductState();
  const handleSearchProduct = () => {
    const filter = allProducts.filter(item => item.category === search);
    setFilteredProduct(filter);
  };

  useEffect(() => {
    if (!search) {
      setFilteredProduct(allProducts);
    }
  }, [search]);
  return (
    <View style={{flex: 1}}>
      <Card minHeight={100} maxWidth={width} paddingLeft={0}>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <Input
            right
            color="black"
            style={{
              height: 48,
              borderWidth: 1,
              borderRadius: 3,
            }}
            iconContent={
              <Entypo
                size={16}
                color={globalStyle.COLORS.MUTED}
                name="camera"
                onPress={handleSearchProduct}
              />
            }
            placeholder="Shoe"
            onChangeText={text => setSearch(text)}
            // onFocus={() => navigation.navigate('ProductDetail')}
          />
        </View>
      </Card>

      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={{...styles.itemCon, marginTop: 0}}>
          {filteredProduct.map((product, index) => (
            <View key={index}>
              <Products product={product} horizontal key={index} />
              {/* <Card minHeight={90} maxWidth={430} paddingLeft={4}>
                <View style={styles.imgAndTextCon}>
                  <TouchableWithoutFeedback
                  // onPress={proceedToProductDetail}
                  >
                    <View style={[styles.imageContainer, styles.shadow]}>
                      <Image
                        source={{
                          uri: product.image[0],
                          // uri: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
                        }}
                        // source={{uri: item.image}}
                        style={[styles.image, {height: 120, width: 140}]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                  // onPress={() => navigation.navigate('Pro', {product: products[0]})}
                  >
                    <View
                      style={{
                        ...styles.productDescription,
                        width: 150,
                        height: 100,
                      }}>
                      <Text style={styles.productTitle} numberOfLines={2}>
                        {product.model}
                      </Text>
                      <View>
                        <Text>$ {product.price}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Card> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

// const styles = StyleSheet.create({});
