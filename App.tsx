/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-reanimated';
import React from 'react';
import {LogBox, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RecoilRoot} from 'recoil';
import {
  HomeStack,
  CustomToast,
  SettingsStack,
  DrawerContent,
} from './components/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GalioProvider} from 'galio-framework';
import globalStyle from './constants/globalStyle';

import {enableScreens} from 'react-native-screens';
import ProfileStack from './components/Stacks/ProfileStack';

LogBox.ignoreLogs(['']);

enableScreens();

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GalioProvider theme={globalStyle}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <RecoilRoot>
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}
              screenOptions={{
                drawerStyle: {
                  backgroundColor: isDarkMode ? '#333' : '#fff',
                  width: 270,
                },
              }}>
              <Drawer.Screen
                options={{
                  headerShown: false,
                }}
                name="Home Screen"
                component={HomeStack}
              />

              <Drawer.Screen
                name="Profile Screen"
                options={{
                  headerShown: false,
                }}
                component={ProfileStack}
              />
              <Drawer.Screen
                name="Settings Screen"
                options={{
                  headerShown: false,
                }}
                component={SettingsStack}
              />
            </Drawer.Navigator>
          </NavigationContainer>
          <CustomToast />
        </RecoilRoot>
      </SafeAreaProvider>
    </GalioProvider>
  );
}

export default App;
