import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {atom, useRecoilState, useSetRecoilState} from 'recoil';

export interface CollectionInterface {
  role: string;
  email: string;
  userId: string;
  joined: string;
  docId: string;
  location: string;
  userName: string;
  profilePic: string;
}

interface AllUserState {
  usersCollection: CollectionInterface[];
  currentUser: CollectionInterface | null;
  isUserLoading: boolean;
  isAuthError: boolean | string;
  snackBarOpen: string | null;
  snackBarSeverity: string;
  previousRoute: string;
  isFirstVisit: boolean;
}

export const userState = atom<AllUserState>({
  key: 'user',
  default: {
    currentUser: null,
    isUserLoading: false,
    usersCollection: [],
    isAuthError: false,
    snackBarOpen: null,
    snackBarSeverity: 'success',
    previousRoute: 'Home Screen',
    isFirstVisit: true,
  },
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  const {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
    isFirstVisit,
  } = user;

  console.log('isFirstVisit: ', isFirstVisit);
  // useEffect(() => {
  //   const loadCartStateFromStorage = async () => {
  //     try {
  //       const storedCartState = await AsyncStorage.getItem('getStarted');

  //       if (storedCartState !== null) {
  //         const parsedCartState = JSON.parse(storedCartState);
  //         setUser((prev: AllUserState) => ({...prev, isFirstVisit: false}));
  //       }
  //     } catch (error) {
  //       console.error('Error loading first visit from AsyncStorage:', error);
  //     }
  //   };

  //   loadCartStateFromStorage();
  // }, []);
  return {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
    setUser,
    isFirstVisit,
  };
};
