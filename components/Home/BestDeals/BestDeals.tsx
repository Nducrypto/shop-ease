import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native';
import globalStyle from '../../../constants/globalStyle';
import {useProductState} from '../../recoilState/productState';
import Products from '../../ProductsList/Products';
import CustomTitle from '../CustomTitle/CustomTitle';
import DataLoader from '../../DataLoader/DataLoader';

const {width} = Dimensions.get('screen');

const BestDeals = () => {
  const {allProducts, isProductLoading} = useProductState();
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const titleArray = ['POPULAR', 'PHONE', 'MEN', 'WOMEN'];

  const getFilteredProduct = () => {
    const filter =
      selectedTitle === 'POPULAR'
        ? allProducts
        : allProducts.filter(
            product =>
              product.category?.toLowerCase() === selectedTitle.toLowerCase(),
          );
    return filter;
  };
  const filteredProduct = getFilteredProduct();

  const firstRow = filteredProduct.slice(0, 1);
  const secondRow = filteredProduct.slice(1, 3);
  const thirdRow = filteredProduct.slice(3, 4);
  const fourthRow = filteredProduct.slice(4, 5);
  const otherRow = filteredProduct.slice(5, allProducts.length - 2);
  const lastRow = filteredProduct.slice(allProducts.length - 2);
  return (
    <View style={styles.home}>
      <CustomTitle
        array={titleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <View style={{alignItems: 'center'}}>
        <DataLoader
          size="large"
          style={{marginTop: 60}}
          isLoading={isProductLoading}
          array={allProducts}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              ...styles.productsContainer,
            }}>
            {firstRow.map((product, index) => (
              <Products product={product} horizontal key={index} />
            ))}

            <View
              style={{
                flexDirection: 'row',
                gap: 20,
              }}>
              {secondRow.map((product, index) => (
                <Products product={product} style={{top: 10}} key={index} />
              ))}
            </View>

            {thirdRow.map((product, index) => (
              <Products
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
            ))}

            {fourthRow.map((product, index) => (
              <Products
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
            ))}

            {otherRow.map((product, index) => (
              <Products
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
            ))}

            {lastRow.map((product, index) => (
              <Products
                product={product}
                full={true}
                key={index}
                style={{top: 10}}
              />
            ))}
          </ScrollView>
        </DataLoader>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    width,
    flex: 1,
    backgroundColor: globalStyle.COLORS.BACKGROUND,
  },

  productsContainer: {
    width: width - 16 * 2,
    paddingVertical: 32,
  },
});

export default BestDeals;
