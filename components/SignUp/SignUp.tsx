import React, {useState} from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
import {
  createUserWithEmailAndPassword,
  auth,
  collection,
  addDoc,
  firestore,
} from '../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {USERS} from '@env';
import {styles} from '../Login/loginStyles';
import CustomButton from '../CustomButton/CustomButton';
import AuthInput from '../AuthInput/AuthInput';
import Entypo from 'react-native-vector-icons/Entypo';

const SignUp = () => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const users = USERS;

  const handleSignup = async () => {
    setLoading(true);
    try {
      const fetchedUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (fetchedUserCredential) {
        const userData = {
          userId: fetchedUserCredential.user.uid,
          email: fetchedUserCredential.user.email,
          role: 'Subscriber',
          joined: new Date().toString(),
          userName,
        };

        const userCollections = collection(firestore, users);
        await addDoc(userCollections, userData);
        navigation.reset({index: 0, routes: [{name: 'Home Screen'}]});
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage = error.message;

      if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
        setError('Email-Already-In-Use');
      } else {
        setError('Password should be at least 6 characters');
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.iconsCon}>
        <Entypo name="facebook-with-circle" color="#3B5998" size={50} />
        <Entypo name="twitter-with-circle" color="#5BC0DE" size={50} />
        <Entypo name="facebook-with-circle" color="#EA4C89" size={50} />
      </View>
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      <View style={styles.sharedCon}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
          or be classical
        </Text>
      </View>
      <View style={styles.sharedCon}>
        <AuthInput
          value={userName}
          placeholder="Username"
          onChangeText={(text: any) => {
            setUserName(text);
            setError('');
          }}
        />
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
        <View style={styles.sharedCon}>
          {!loading && (
            <CustomButton
              title="SIGN UP"
              width="100%"
              onPress={() => handleSignup()}
              testID="sign-up-button"
            />
          )}
        </View>
      </View>

      <View>
        <Text
          style={styles.sharedText}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
