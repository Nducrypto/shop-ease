import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuToggleIcon from '../CustomDrawerContent/MenuToggleIcon';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import UserAgreement from '../User-Agreement/UserAgreement';
import {Navbar} from '..';

const Tab = createStackNavigator<any>();
const SettingsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name="Settings"
        options={{
          title: 'Settings',
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Settings}
      />
      <Tab.Screen
        name="Notifications"
        options={{headerRight: () => <Navbar />}}
        component={Notifications}
      />
      <Tab.Screen name="User Agreement" component={UserAgreement} />
      <Tab.Screen name="Privacy Policy" component={UserAgreement} />
    </Tab.Navigator>
  );
};

export default SettingsStack;
