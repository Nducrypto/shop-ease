import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../CustomButton/CustomButton';
import {height} from '../actions/utils';
import globalStyle from '../../constants/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserState} from '../recoilState/userState';

const GetStarted = () => {
  const navigation = useNavigation<any>();
  const {isFirstVisit, setUser} = useUserState();
  console.log('isFirstVisit: ', isFirstVisit);

  const handleGetStarted = async () => {
    try {
      setUser(prev => ({...prev, isFirstVisit: false}));
      AsyncStorage.setItem(
        'getStarted',
        JSON.stringify('This user has visied'),
      );
    } catch (error) {}
    throw new Error('failed to update get Started');
  };

  return (
    <ImageBackground
      source={require('../../assets/man-shop.png')}
      style={styles.background}
      imageStyle={styles.imageStyle}
      resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.container}>
        <Text style={styles.text}>Welcome to shopease</Text>
        <Text style={styles.desc}>Your ultimate shopping destination</Text>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={styles.button}>
          <CustomButton
            title="GET STARTED"
            width={350}
            onPress={() => handleGetStarted()}
            testID="get-started-button"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: globalStyle.COLORS.BLACK_BACKGROUND,
  },
  imageStyle: {
    height: height / 3,
    marginTop: 50,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height / 3,
  },
  desc: {
    fontSize: 20,
    fontWeight: '300',
    color: '#fff',
    marginTop: 30,
  },
  button: {
    top: 100,
  },
});

export default GetStarted;
