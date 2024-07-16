import {Text, View, Pressable} from 'react-native';
import {
  decrementQuantityInDatabase,
  incrementQuantityInDatabase,
} from '../actions/cartAction';
import {styles} from './cartStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CartItem, useCartState} from '../recoilState/cartState';
import {useSnackBarState} from '../recoilState/snacbarState';

const CustomButton = ({item}: {item: CartItem}) => {
  const {setSnackBar} = useSnackBarState();
  const {setCart} = useCartState();
  function handleDecrement(product: CartItem) {
    decrementQuantityInDatabase(product, setCart, setSnackBar);
  }

  function handleIncrement(product: CartItem) {
    incrementQuantityInDatabase(product, setCart, setSnackBar);
  }

  return (
    <View
      style={{
        marginTop: 10,
        marginLeft: 20,
      }}>
      <View style={styles.quantityContainer}>
        <Pressable
          disabled={item.quantity < 2}
          onPress={() => handleDecrement(item)}>
          {({pressed}) => (
            <Text
              style={{
                padding: 7,
                backgroundColor: pressed ? 'grey' : 'brown',
                color: 'white',
                textAlign: 'center',
                borderRadius: 10,
                opacity: item?.quantity < 2 ? 0.5 : 2,
              }}>
              <Icon name="minus" size={16} color="white" />
            </Text>
          )}
        </Pressable>

        <Text style={styles.productQuantity}>{item.quantity}</Text>
        <Pressable onPress={() => handleIncrement(item)}>
          {({pressed}) => (
            <Text
              style={{
                padding: 7,
                backgroundColor: pressed ? 'grey' : 'orangered',
                color: 'white',
                textAlign: 'center',
                borderRadius: 10,
              }}>
              <Icon name="plus" size={16} color="white" />
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CustomButton;
