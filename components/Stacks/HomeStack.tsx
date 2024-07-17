import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ProductDetail,
  MenuToggleIcon,
  Categories,
  BestDeals,
  Search,
  LogIn,
  SignUp,
  Navbar,
  Cart,
  ContactUs,
  GetStarted,
} from '../index';
import {useUserState} from '../recoilState/userState';
import ProductList from '../ProductsList/ProductList';

const Tab = createStackNavigator();

const HomeStack = () => {
  const {currentUser, isFirstVisit} = useUserState();

  const defaultScreenOptions = {
    headerBackTitleVisible: false,
    headerTintColor: 'black',
  };

  const routes = useMemo(
    () => [
      {
        name: 'ProductList',
        component: ProductList,
        options: {
          title: 'Home',
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        },
      },
      {
        name: 'BestDeals',
        component: BestDeals,
      },
      {
        name: 'Categories',
        component: Categories,
        options: {headerRight: () => <Navbar />},
      },
      {
        name: 'Search',
        component: Search,
        options: {headerRight: () => <Navbar />},
      },
      {
        name: 'ProductDetail',
        component: ProductDetail,
        options: {
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerRight: () => <Navbar search />,
        },
      },
      {
        name: 'Contact Us',
        component: ContactUs,
        options: {
          title: currentUser?.userName,
        },
      },
      {
        name: 'Cart',
        component: Cart,
        options: {
          headerTitle: 'Shopping Cart',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'black',
        },
      },
      {
        name: 'Sign In',
        component: LogIn,
        options: {
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
        },
      },
      {
        name: 'Sign Up',
        component: SignUp,
        options: {
          title: 'Create Account',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
        },
      },
    ],
    [currentUser],
  );

  return (
    <Tab.Navigator screenOptions={defaultScreenOptions}>
      {isFirstVisit ? (
        <Tab.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
      ) : (
        routes.map(route => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      )}
    </Tab.Navigator>
  );
};

export default HomeStack;
