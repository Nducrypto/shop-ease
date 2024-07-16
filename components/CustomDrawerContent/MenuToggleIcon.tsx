import {StyleSheet, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const MenuToggleIcon = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Entypo
        size={25}
        color="blue"
        name="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        style={{marginLeft: 10}}
      />
    </View>
  );
};

export default MenuToggleIcon;

const styles = StyleSheet.create({});
