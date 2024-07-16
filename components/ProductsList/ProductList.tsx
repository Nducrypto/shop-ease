import Products from './Products';

// import UniqueBrand from '../ProductDetail/UniqueBrand';
// const ProductList = () => {
//   const [selectedBrand, setSelectedBrand] = useState<number | string>('All');

//   return (
//     <SafeAreaView>
//       <UniqueBrand
//         setSelectedBrand={setSelectedBrand}
//         selectedBrand={selectedBrand}
//       />

//   );
// };

import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

import {Button, Text, Input, theme} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle from '../../constants/globalStyle';
import {useProductState} from '../recoilState/productState';
import {fetchAllProducts} from '../actions/productActions';
import Card from '../Card/Card';
import DataLoader from '../DataLoader/DataLoader';
import {useAuthentication} from '../actions/usersAction';
Entypo.loadFont();

const {width} = Dimensions.get('screen');

const ProductList = () => {
  useAuthentication();
  fetchAllProducts();
  const {allProducts, isProductLoading} = useProductState();
  const navigation = useNavigation<any>();

  const renderSearch = () => {
    return (
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Input
          right
          color="black"
          style={styles.search}
          iconContent={
            <Entypo size={16} color={globalStyle.COLORS.MUTED} name="camera" />
          }
          placeholder="What are you looking for?"
          onFocus={() => navigation.navigate('Search')}
        />
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate('Categories')}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              size={20}
              color={globalStyle.COLORS.MUTED}
              name="grid"
              style={{paddingRight: 8}}
            />

            <Text size={16} style={styles.tabTitle}>
              Categories
            </Text>
          </View>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate('BestDeals')}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: globalStyle.COLORS.MUTED}}
            />
            <Text size={16} style={styles.tabTitle}>
              Best Deals
            </Text>
          </View>
        </Button>
      </View>
    );
  };

  const renderProducts = () => {
    const firstRow = allProducts.slice(0, 1);
    const secondRow = allProducts.slice(1, 3);
    const thirdRow = allProducts.slice(3, 4);
    const fourthRow = allProducts.slice(4, 5);
    const otherRow = allProducts.slice(5, allProducts.length - 2);
    const lastRow = allProducts.slice(allProducts.length - 2);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
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
          <Products product={product} horizontal key={index} />
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
          <Products product={product} horizontal key={index} />
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
    );
  };

  return (
    <View style={styles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <Card minHeight={100} maxWidth={500}>
        {renderSearch()}
        {renderTabs()}
      </Card>

      <DataLoader
        size="large"
        style={{marginTop: 60}}
        isLoading={isProductLoading}
        array={allProducts}>
        {renderProducts()}
      </DataLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    width: width,
    backgroundColor: globalStyle.COLORS.BACKGROUND,
    paddingBottom: 70,
  },
  search: {
    height: 48,
    width: width - 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme?.COLORS?.WHITE,
    shadowColor: theme?.COLORS?.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 3,
    marginTop: 10,
    elevation: 4,
    flexDirection: 'row',
  },
  tab: {
    backgroundColor: theme?.COLORS?.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: globalStyle.COLORS.MUTED,
  },
  products: {
    width: width - 16 * 2,
    paddingVertical: 16 * 2,
  },
});

export default ProductList;
