import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Input} from 'galio-framework';
import globalStyle from '../../constants/globalStyle';

const {height} = Dimensions.get('screen');

interface Props {
  value: any;
  onChangeText: any;
  placeholder: string;
  viewPass?: boolean;
}
const AuthInput = ({value, onChangeText, placeholder, viewPass}: Props) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        color="white"
        viewPass={viewPass ? true : false}
        password={viewPass ? true : false}
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
        borderless
        bgColor={globalStyle.COLORS.BLACK_BACKGROUND}
        // bgColor={globalStyle.COLORS.BLACK_BACKGROUND}
        iconColor={globalStyle.COLORS.INPUT}
      />
      <View style={styles.line} />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {marginBottom: 20, height: height / 13.34},
  line: {
    borderBottomWidth: 0.3,
    marginTop: -8,
    borderBottomColor: 'lightgrey',
  },
});
