// import {
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import {clearCartInDatabase, removeCartItem} from '../actions/cartAction';
// import {useNavigation} from '@react-navigation/native';
// import CustomButton from './CustomButton';
// import {styles} from './cartStyle';
// import {useUserState} from '../recoilState/userState';
// import {useCartState, CartItem} from '../recoilState/cartState';
// import {useSnackBarState} from '../recoilState/snacbarState';
// import {createOrder} from '../actions/orderActions';
// import {useOrderState} from '../recoilState/orderState';
// import {Paystack} from 'react-native-paystack-webview';
// import {useRef} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {PAYSTACK_TEST_PUBLIC_KEY} from '@env';

// export interface Data {
//   email: string;
//   userId: string;
//   items: CartItem[];
//   subTotal: number;
//   status: string;
//   date: string;
// }
// const CartPage = () => {
//   const paystackWebViewRef = useRef<any>();
//   const {navigate}: {navigate: any} = useNavigation();
//   const {currentUser} = useUserState();
//   const {cartItems, subTotal, setCart} = useCartState();
//   const {setSnackBar} = useSnackBarState();
//   const {setOrders, isOrderLoading} = useOrderState();
//   const paystackKey = 'pk_test_657c47c2c044372576a9fa001e9c5df603a28626';
//   // const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;

//   async function handlePaymentSuccess(reference: any) {
//     const data: Data = {
//       email: currentUser?.email || '',
//       userId: currentUser?.userId || '',
//       items: cartItems,
//       subTotal,
//       status: 'Pending',
//       date: new Date().toString(),
//     };
//     createOrder(data, setOrders, setSnackBar, setCart, navigate);
//   }

//   function handlePaystackCloseAction() {
//
//   }

//   function handleRemoveItem(product: CartItem) {
//     removeCartItem(product, setCart, setSnackBar);
//   }
//   function checkoutButton() {
//     if (isOrderLoading) {
//       return (
//         <View>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <View>
//         <TouchableOpacity
//           onPress={() => paystackWebViewRef?.current?.startTransaction()}>
//           <Text style={styles.checkout}>{`Checkout (${Intl.NumberFormat(
//             'en-NG',
//             {
//               style: 'currency',
//               currency: 'NGN',
//             },
//           ).format(subTotal)})`}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.cartContainer}>
//           {cartItems.length > 1 && (
//             <TouchableOpacity
//               style={{backgroundColor: 'white', alignSelf: 'flex-end'}}
//               onPress={() => clearCartInDatabase(setCart, setSnackBar)}>
//               <Text style={styles.clearCartText}>Clear</Text>
//             </TouchableOpacity>
//           )}
//           <Text style={styles.subTotalText}>
//             SubTotal: &#8358; {subTotal && Intl.NumberFormat().format(subTotal)}
//           </Text>

//           {!cartItems.length && <Text style={styles.emptyCartText}>Empty</Text>}
//           {cartItems.map((item, index) => (
//             <View key={item.productId} style={styles.productContainer}>
//               <Image
//                 source={{uri: item?.image[0]}}
//                 style={styles.productImage}
//               />
//               <View>
//                 <Text style={styles.productModel}>{item?.model}</Text>
//                 <Text style={styles.productBrand}>Brand: {item?.brand}</Text>
//                 <Text style={styles.productPrice}>
//                   &#8358; {Intl.NumberFormat().format(item?.price)}
//                 </Text>
//                 <View style={styles.buttonContainer}>
//                   <CustomButton item={item} />
//                   <TouchableOpacity
//                     style={styles.removeButton}
//                     onPress={() => handleRemoveItem(item)}>
//                     <Icon
//                       name="trash"
//                       style={styles.trashButton}
//                       size={25}
//                       color="red"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//       {cartItems.length > 0 && (
//         <View style={styles.bottomContainer}>
//           <Text>Contact </Text>

//         </View>
//       )}
//     </View>
//   );
// };

// export default CartPage;
import {
  ScrollView,
  Image,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  addProductToCart,
  clearCartInDatabase,
  incrementQuantityInDatabase,
  removeCartItem,
} from '../actions/cartAction';
import {useNavigation} from '@react-navigation/native';
import {styles} from './cartStyle';
import {Paystack} from 'react-native-paystack-webview';
import {useRef, useState} from 'react';
import {Button} from 'galio-framework';
import globalStyle from '../../constants/globalStyle';
import Card from '../Card/Card';
import Select from '../SelectButton/Select';
import CustomButton from '../CustomButton/CustomButton';
import {useUserState} from '../recoilState/userState';
import {useCartState, CartItem} from '../recoilState/cartState';
import {useSnackBarState} from '../recoilState/snacbarState';
import {createOrder} from '../actions/orderActions';
import {useOrderState} from '../recoilState/orderState';
import {ProductInterface} from '../recoilState/productState';

import {PAYSTACK_TEST_PUBLIC_KEY} from '@env';
import {useProductState} from '../recoilState/productState';
import DataLoader from '../DataLoader/DataLoader';

export interface Data {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
}
const {width} = Dimensions.get('screen');

const Cart = () => {
  const [quantity, setQuantity] = useState<string | number>(1);
  // const paystackKey = 'pk_test_657c47c2c044372576a9fa001e9c5df603a28626';
  const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;
  const paystackWebViewRef = useRef<any>();
  const navigation = useNavigation<any>();
  const {currentUser} = useUserState();
  const {cartItems, subTotal, setCart} = useCartState();
  const {allProducts} = useProductState();
  const {setSnackBar} = useSnackBarState();
  const {setOrders, isOrderLoading} = useOrderState();

  const handleOnSelect = async (
    index: string,
    value: number | string,
    item: any,
  ) => {
    await setQuantity(value);
    incrementQuantityInDatabase(item, Number(value), setCart, setSnackBar);
  };

  const itemsShoppedByOthers = cartItems.length
    ? allProducts
        .filter(
          product =>
            !cartItems.some(
              cartItem => cartItem.productId === product.productId,
            ),
        )
        .slice(0, 8)
    : [];

  function handleAddToCart(product: ProductInterface) {
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const data = {
      ...product,
      quantity,
      totalPrice: totalPrice,
      discountedPrice: null,
      likes: null,
      date: new Date().toString(),
      selectedSize: 'M',
    };
    addProductToCart(data, setCart, setSnackBar);
  }
  async function handlePaymentSuccess(reference: any) {
    const data: Data = {
      email: currentUser?.email || '',
      userId: currentUser?.userId || '',
      items: cartItems,
      subTotal,
      status: 'Pending',
      date: new Date().toString(),
    };
    createOrder(data, setOrders, setSnackBar, setCart, navigation.navigate);
  }

  function handlePaystackCloseAction() {}

  function handleRemoveItem(product: CartItem) {
    removeCartItem(product, setCart, setSnackBar);
  }

  const numberOfItemsInCart = cartItems.length;

  function CheckoutButton() {
    return (
      <View>
        {!currentUser?.email ? (
          <CustomButton
            title="SIGN IN TO CONTINUE"
            width="100%"
            marginTop={15}
            testID="proceed-to-login-button"
            // onPress={() => navigation.navigate('ProductDetail')}
            onPress={() => navigation.navigate('Sign In')}
          />
        ) : (
          <View>
            <Paystack
              paystackKey={paystackKey}
              billingEmail={currentUser?.email || ''}
              amount={subTotal}
              currency="NGN"
              onCancel={handlePaystackCloseAction}
              onSuccess={res => handlePaymentSuccess(res)}
              ref={paystackWebViewRef}
            />
            <CustomButton
              title="PROCEED TO CHECKOUT"
              width="100%"
              marginTop={15}
              testID="proceed-to-checkout-button"
              onPress={() => paystackWebViewRef?.current?.startTransaction()}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <DataLoader
        size="large"
        style={{marginTop: 60}}
        isLoading={false}
        array={cartItems}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.subTotalCont}>
            <Text style={styles.subTotalLabel}>
              Cart Subtotal ({numberOfItemsInCart}):{' '}
            </Text>
            <Text style={styles.subTotalValue}>
              ${Intl.NumberFormat().format(subTotal)}
            </Text>
          </View>
          <CheckoutButton />
          <TouchableOpacity
            // style={{backgroundColor: 'white', alignSelf: 'flex-end'}}
            onPress={() => clearCartInDatabase(setCart, setSnackBar)}>
            <Text>Clear</Text>
          </TouchableOpacity>
          <View style={styles.itemCon}>
            {cartItems.map((item, index) => (
              <View key={index} style={{marginVertical: 20}}>
                <Card minHeight={130} maxWidth={width - 30} paddingLeft={4}>
                  <View>
                    <View style={styles.imgAndTextCon}>
                      <View>
                        <View style={[styles.imageContainer, styles.shadow]}>
                          <Image
                            source={{uri: item.image[0]}}
                            style={[styles.image]}
                          />
                        </View>
                      </View>
                      <View>
                        <View style={styles.productDescription}>
                          <Text style={styles.productTitle} numberOfLines={2}>
                            {item.model}
                          </Text>

                          <View style={styles.inStockCon}>
                            <Text style={{color: 'green'}}>In stock</Text>
                            <Text
                              style={{
                                color: globalStyle.COLORS.GRADIENT_START,
                              }}>
                              ${Intl.NumberFormat().format(item?.price)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.groupedButCon}>
                      <View style={{marginTop: 8}}>
                        <Select
                          defaultIndex={0}
                          options={['1', '2', '3', '4']}
                          style={{}}
                          onSelect={(index, value) =>
                            handleOnSelect(index, value, item)
                          }
                          value={quantity}
                        />
                      </View>
                      <View>
                        <Button
                          center
                          shadowless
                          color={globalStyle.COLORS.DEFAULT}
                          textStyle={styles.optionsText}
                          style={[
                            styles.optionsButton,
                            // styles.shadow
                          ]}
                          onPress={() => handleRemoveItem(item)}>
                          DELETE
                        </Button>
                      </View>
                      <View>
                        <Button
                          center
                          shadowless
                          color={globalStyle.COLORS.DEFAULT}
                          textStyle={styles.optionsText}
                          style={[styles.optionsButton]}>
                          SAVE FOR LATER
                        </Button>
                      </View>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
          </View>

          <View style={{marginBottom: 50}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Customers who shopped for items in your cart also shopped for:
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                minWidth: width,
              }}>
              {itemsShoppedByOthers.map((item, index) => (
                <View key={index} style={{marginTop: 30}}>
                  <Card minHeight={194} maxWidth={width / 2.6} paddingLeft={4}>
                    <View>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate('ProductDetail', {
                            ...item,
                          })
                        }>
                        <View style={[styles.imageContainer, styles.shadow]}>
                          <Image
                            // source={{
                            //   uri: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
                            // }}
                            source={{uri: item.image[0]}}
                            style={[styles.image, {width: width / 3}]}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                      // onPress={() => navigation.navigate('Pro', {product: products[0]})}
                      >
                        <View
                          style={{
                            ...styles.productDescription,
                            paddingHorizontal: 8,
                          }}>
                          <Text style={styles.productTitle}>
                            {item.model.slice(0, 20)}
                          </Text>
                          <View>
                            <Text
                              style={{
                                color: globalStyle.COLORS.GRADIENT_START,
                              }}>
                              ${Intl.NumberFormat().format(item?.price)}
                            </Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </Card>
                  <View>
                    <CustomButton
                      marginTop={9}
                      title="ADD TO CART"
                      width="100%"
                      testID="add-to-cart-button"
                      onPress={() => handleAddToCart(item)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={{marginTop: 25}}>
              <CheckoutButton />
            </View>
          </View>
        </ScrollView>
      </DataLoader>
    </View>
  );
};

export default Cart;
