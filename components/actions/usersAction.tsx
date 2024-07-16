import {useEffect} from 'react';
import {
  firestore,
  collection,
  onAuthStateChanged,
  auth,
  onSnapshot,
  getDocs,
} from '../config/firebase';
import {CollectionInterface, useUserState} from '../recoilState/userState';
import {USERS} from '@env';

// const usersRoute = 'users';
const usersRoute = USERS;

export const useAuthentication = () => {
  const {setUser} = useUserState();

  useEffect(() => {
    setUser(prev => ({
      ...prev,
      isUserLoading: true,
      isAuthError: false,
    }));
    const unSubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const usersCollectionRef = collection(firestore, usersRoute);
        const userSnapshot = await getDocs(usersCollectionRef);
        for (const doc of userSnapshot.docs) {
          const data = doc?.data() as CollectionInterface;

          if (data?.email === user?.email) {
            setUser(prev => ({
              ...prev,
              currentUser: data,
              isUserLoading: false,
            }));

            return;
          }
        }
      } else {
        setUser(prev => ({
          ...prev,
          currentUser: null,
          isUserLoading: false,
          isAuthError: `User Signed Out`,
        }));
      }
    });

    return unSubscribe;
  }, [setUser]);
};

export const fetchAllUsers = () => {
  const {setUser} = useUserState();
  useEffect(() => {
    const listenForChangeUsers = onSnapshot(
      collection(firestore, usersRoute),
      snapshot => {
        const allUsers: CollectionInterface[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as CollectionInterface;
          allUsers.push({
            ...data,
            docId: doc.id,
          });
        });
        setUser(prev => ({
          ...prev,
          usersCollection: allUsers,
        }));
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, [setUser]);
};
