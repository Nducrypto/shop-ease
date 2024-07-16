import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import globalStyle from '../../constants/globalStyle';

interface Props {
  size: any;
  style?: any;
  isLoading: boolean;
  children: React.ReactNode;
  array: any;
}
const DataLoader = ({size, style, isLoading, children, array}: Props) => {
  const isArrayEmpty = !isLoading && !array.length;

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size={size}
          color={globalStyle.COLORS.GRADIENT_START}
          style={style}
        />
      ) : isArrayEmpty ? (
        <Text style={styles.text}>Empty</Text>
      ) : (
        <Text>{children}</Text>
      )}
    </View>
  );
};

export default DataLoader;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 200,
  },
});
