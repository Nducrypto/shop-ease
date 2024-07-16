import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import CustomTitle from '../CustomTitle/CustomTitle';
import Card from '../../Card/Card';
import {useProductState} from '../../recoilState/productState';
import DataLoader from '../../DataLoader/DataLoader';
import globalStyle from '../../../constants/globalStyle';

const {width} = Dimensions.get('screen');

const Categories = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const [categories, setCategories] = useState<any>([]);
  const {allProducts, isProductLoading} = useProductState();
  const titleArray = ['POPULAR', 'BEAUTY', 'CAR & MOTOR', 'PHONE'];

  useEffect(() => {
    const uniqueCategory = new Set();
    const array: any = [];
    function categoryTitle() {
      for (const item of allProducts) {
        if (!uniqueCategory.has(item.category)) {
          uniqueCategory.add(item.category);
          array.push(item);
        }
      }
      setCategories([...array]);
    }
    if (allProducts.length) {
      categoryTitle();
    }
  }, [allProducts.length]);

  return (
    <View style={styles.home}>
      <CustomTitle
        array={titleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <DataLoader
        size="large"
        style={{marginTop: 60}}
        isLoading={isProductLoading}
        array={allProducts}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>
          <View>
            {categories.map((item: any, index: number) => (
              <View key={index} style={{marginTop: 30}}>
                <Card minHeight={234} maxWidth={430}>
                  <ImageBackground
                    source={{
                      uri: item.image[0],
                    }}
                    style={styles.background}
                    resizeMode="cover">
                    <View style={styles.container}>
                      <Text style={styles.text}>{item.category}</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>
      </DataLoader>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  home: {
    width: width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: globalStyle.COLORS.BACKGROUND,
    paddingBottom: 30,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  products: {
    width: width - 16 * 2,
    paddingVertical: 4,
    paddingBottom: 20,
  },
});
