import {createStackNavigator} from '@react-navigation/stack';
import {
  ProductDetail,
  MenuToggleIcon,
  Navbar,
  Cart,
  ContactUs,
  Profile,
} from '../index';
import {useUserState} from '../recoilState/userState';

const Tab = createStackNavigator<any>();
const ProfileStack = () => {
  const {currentUser} = useUserState();
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name="Profile"
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Profile}
      />

      <Tab.Screen
        name="ProductDetail"
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },

          headerRight: () => <Navbar search />,
        }}
        component={ProductDetail}
      />
      <Tab.Screen
        name="Contact Us"
        options={{
          title: currentUser?.userName,
        }}
        component={ContactUs}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerTitle: 'Shopping Cart',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'black',
        }}
        component={Cart}
      />
    </Tab.Navigator>
  );
};

export default ProfileStack;
