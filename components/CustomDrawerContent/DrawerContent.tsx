import React, {useState} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import globalStyle from '../../constants/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {screens} from './screenData';
import {useAuthentication} from '../actions/usersAction';
import {useUserState} from '../recoilState/userState';
import {auth, signOut} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

Feather.loadFont();
EvilIcons.loadFont();

const DrawerContent = (props: any) => {
  // useAuthentication();
  const [selectedScreen, setSelectedScreen] = useState<string>('Home');
  const navigation = useNavigation<any>();
  const {currentUser, setUser} = useUserState();

  function handleNavigation(screenName: string) {
    navigation.navigate(screenName);
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('getStarted');
      await setUser((prev: any) => ({...prev, isFirstVisit: true}));
      navigation.navigate('Home Screen');
    } catch (error) {
      console.log(error);
    }
  }
  const avatar =
    'https://images.unsplash.com/photo-1519617317074-dfb3902fc51a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNrYXRlcnxlbnwwfHwwfHx8MA%3D%3D';

  const screens = [
    {label: 'Home', icon: 'home', screen: 'Home Screen', IconType: Feather},

    ...(currentUser && currentUser?.email
      ? [
          {
            label: 'Woman',
            icon: 'users',
            screen: 'Home Screen',
            IconType: Feather,
          },
          {
            label: 'Man',
            icon: 'users',
            screen: 'Home Screen',
            IconType: Feather,
          },
          {
            label: 'Kids',
            icon: 'menu',
            screen: 'Home Screen',
            IconType: Entypo,
          },
          {
            label: 'Profile',
            icon: 'user',
            screen: 'Profile Screen',
            IconType: EvilIcons,
          },
          {
            label: 'Settings',
            icon: 'cog',
            screen: 'Settings Screen',
            IconType: Entypo,
          },
        ]
      : []),
  ];

  return (
    <View style={styles.drawerContent}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleNavigation('Profile');
            setSelectedScreen('Profile');
          }}>
          <View style={styles.profile}>
            <Image
              source={{uri: currentUser?.profilePic || avatar}}
              style={styles.avatar}
            />
            <Text style={{fontSize: 18, color: 'white'}}>
              {currentUser?.userName}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{flexDirection: 'row'}}>
          {currentUser && currentUser?.email && (
            <View style={styles.pro}>
              <Text style={{fontSize: 14, color: 'white'}}>Pro</Text>
            </View>
          )}

          {currentUser && currentUser?.email && (
            <Text
              style={{
                ...styles.seller,
                fontSize: 16,
                color: globalStyle.COLORS.MUTED,
              }}>
              Seller
            </Text>
          )}

          {currentUser && currentUser?.email && (
            <Text style={{fontSize: 16, color: globalStyle.COLORS.WARNING}}>
              4.8 <AntDesign name="star" size={14} />
            </Text>
          )}
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <View style={styles.menu}>
          {screens.map((screen, index) => (
            <View
              style={[
                styles.menuItem,
                {
                  ...(screen.label === selectedScreen && {
                    backgroundColor: globalStyle.COLORS.GRADIENT_START,
                  }),
                },
              ]}
              key={index}>
              <DrawerItem
                icon={({color, size}) => (
                  <screen.IconType name={screen.icon} size={19} color="gray" />
                )}
                label={screen.label}
                onPress={() => {
                  handleNavigation(screen.screen);
                  setSelectedScreen(screen.label);
                }}
                labelStyle={{
                  fontSize: 16,
                  color: selectedScreen === screen.label ? 'white' : 'black',
                }}
              />
            </View>
          ))}
        </View>
      </DrawerContentScrollView>
      <View style={styles.authButtonCon}>
        {currentUser && currentUser?.email ? (
          <TouchableOpacity
            style={{...styles.authBut, top: 30}}
            onPress={handleSignOut}>
            <Entypo name="menu" size={20} color="grey" />
            <Text style={styles.authText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.authBut}
              onPress={() => handleNavigation('Sign In')}>
              <Entypo name="menu" size={20} color="grey" />
              <Text style={styles.authText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.authBut, top: 20}}
              onPress={() => handleNavigation('Sign Up')}>
              <Feather name="user-plus" size={20} color="grey" />
              <Text style={styles.authText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: globalStyle.COLORS.GRADIENT_START,
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  menu: {
    // marginTop: -20,
    paddingHorizontal: 10,
    flex: 1,
  },
  menuItem: {
    borderRadius: 9,
    // marginTop: 20,
  },

  profile: {
    marginBottom: 10,
  },

  pro: {
    backgroundColor: globalStyle.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  },
  authButtonCon: {
    flex: 0.4,
    paddingLeft: 30,
    marginTop: 20,
  },
  authBut: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  authText: {
    fontSize: 16,
    color: 'black',
  },
});
