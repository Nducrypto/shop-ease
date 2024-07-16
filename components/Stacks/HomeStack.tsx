import ProductList from '../ProductsList/ProductList';
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

const Tab = createStackNavigator<any>();
const HomeStack = () => {
  const {currentUser, isFirstVisit} = useUserState();

  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      {isFirstVisit ? (
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Get Started"
          component={GetStarted}
        />
      ) : (
        <Tab.Screen
          name="ProductList"
          options={{
            title: 'Home',
            headerLeft: () => <MenuToggleIcon />,
            headerRight: () => <Navbar />,
          }}
          component={ProductList}
        />
      )}

      <Tab.Screen name="BestDeals" component={BestDeals} />
      <Tab.Screen
        name="Categories"
        options={{headerRight: () => <Navbar />}}
        component={Categories}
      />
      <Tab.Screen
        name="Search"
        options={{headerRight: () => <Navbar />}}
        component={Search}
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
      <Tab.Screen
        name="Sign In"
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
        }}
        component={LogIn}
      />
      <Tab.Screen
        name="Sign Up"
        options={{
          title: 'Create Account',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
        }}
        component={SignUp}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
