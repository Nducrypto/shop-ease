import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/globalStyle';

interface Props {
  title: string;
  width: any;
  onPress: any;
  testID: string;
  marginTop?: number;
}
const CustomButton = ({title, width, onPress, marginTop, testID}: Props) => {
  return (
    <View>
      <TouchableOpacity
        testID={testID}
        style={{...styles.button, width, marginTop}}
        onPress={onPress}>
        <Text style={{...styles.text, color: 'white'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
