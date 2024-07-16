import {Data} from '../Cart/Cart';
import {firestore, collection, onSnapshot} from '../config/firebase';
import {useOrderState, OrderItem, OrderState} from '../recoilState/orderState';
import {snackBarSuccess} from '../recoilState/snacbarState';
import {clearCartInDatabase} from './cartAction';
import {createInDatabase} from './utils';
import {ORDERS} from '@env';

import {useEffect} from 'react';

// const orderRoute = 'orders';
const orderRoute = ORDERS;

export const createOrder = async (
  orderData: Data,
  setOrders: any,
  setSnackBar: any,
  setCart: any,
  navigate: any,
) => {
  try {
    setOrders((prev: any) => ({...prev, isOrderLoading: true}));
    const orderId = await createInDatabase(orderRoute, orderData);

    if (orderId) {
      setOrders((prev: OrderState) => {
        const newState = {...prev};

        newState.isOrderLoading = false;
        return newState;
      });
      clearCartInDatabase(setCart, setSnackBar);
      snackBarSuccess('Order placed successfully', 'success', setSnackBar);
      navigate('Order', {
        email: orderData.email,
      });
    }
  } catch (error) {}
};
export const getAllOrders = () => {
  const {setOrders} = useOrderState();

  useEffect(() => {
    setOrders(prev => ({
      ...prev,
      isOrderLoading: true,
      isOrderError: false,
    }));

    const listenForChangeUsers = onSnapshot(
      collection(firestore, orderRoute),
      snapshot => {
        const allOrders: Record<string, OrderItem[]> = {};

        snapshot.forEach(doc => {
          const data = {
            ...(doc.data() as OrderItem),
            orderId: doc.id,
          };
          if (!allOrders[data.email]) {
            allOrders[data.email] = [];
          }
          allOrders[data.email].push(data);
        });
        setOrders(previous => ({
          ...previous,
          allOrders,
          isOrderLoading: false,
        }));
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, [setOrders]);
};
