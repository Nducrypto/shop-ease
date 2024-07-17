import React, {useState} from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
import {signInWithEmailAndPassword, auth} from '../config/firebase';
import {styles} from './loginStyles';
import {useNavigation} from '@react-navigation/native';
import {useUserState} from '../recoilState/userState';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthInput from '../AuthInput/AuthInput';
import CustomButton from '../CustomButton/CustomButton';

const LogIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {previousRoute, currentUser, isUserLoading} = useUserState();

  const navigation = useNavigation() as any;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential) {
        // navigation.navigate(previousRoute);
        navigation.reset({index: 0, routes: [{name: 'Home Screen'}]});
      }
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        setError('Wrong-Password');
      } else {
        setError('User-Not-Found');
      }
      setLoading(false);
    }
  };

  if (currentUser?.email && !isUserLoading) {
    navigation.navigate('Home Screen');
  }

  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.iconsCon}>
        <Entypo name="facebook-with-circle" color="#3B5998" size={50} />
        <Entypo name="twitter-with-circle" color="#5BC0DE" size={50} />
        <Entypo name="facebook-with-circle" color="#EA4C89" size={50} />
      </View>
      <View style={styles.sharedCon}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
          or be classical
        </Text>
      </View>
      <Text>{error}</Text>
      {loading && <ActivityIndicator />}

      <View style={styles.sharedCon}>
        <AuthInput
          value={email}
          placeholder="Email"
          onChangeText={(text: any) => {
            setEmail(text);
            setError('');
          }}
        />
        <AuthInput
          value={password}
          placeholder="Password"
          onChangeText={(text: any) => {
            setPassword(text);
            setError('');
          }}
          viewPass
        />
      </View>

      <View>
        <Text style={styles.forgPass} onPress={() => {}}>
          Forgot your password ?{' '}
        </Text>
      </View>
      {!loading && (
        <CustomButton
          title="LOG IN"
          width="100%"
          onPress={() => handleLogin()}
          testID="login-button"
          marginTop={40}
        />
      )}
      <View>
        <Text style={styles.sharedText} onPress={() => {}}>
          Don't have an Account? Sign Up
        </Text>
      </View>
    </View>
  );
};

export default LogIn;
