import {
  firestore,
  doc,
  collection,
  updateDoc,
  onSnapshot,
  getDocs,
} from '../config/firebase';
import {useEffect} from 'react';
import {
  AllProductState,
  ProductInterface,
  useProductState,
} from '../recoilState/productState';
import {removeInDatabase, createInDatabase} from './utils';
import {snackBarFailure, snackBarSuccess} from '../recoilState/snacbarState';
import {PRODUCTS} from '@env';

// const productRoute = 'products';
const productRoute = PRODUCTS;
export const addProduct = async (
  newProduct: ProductInterface,
  setProduct: any,
  setSnackBar: any,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));
  try {
    const productId = await createInDatabase(productRoute, newProduct);

    if (productId) {
      const data = {
        ...newProduct,
        productId,
      };
      setProduct((prev: AllProductState) => ({
        ...prev,
        allProducts: {...prev.allProducts, [data.productId]: {...data}},
        isProductLoading: false,
      }));
      snackBarSuccess('New product added successfully', 'success', setSnackBar);
    }
  } catch (error) {
    snackBarFailure('Failed To Create Product', 'error', setSnackBar);
  }
};

export const fetchAllProducts = () => {
  const {setProduct} = useProductState();

  useEffect(() => {
    setProduct(prevState => ({
      ...prevState,
      isProductLoading: true,
    }));

    const unsubscribe = onSnapshot(
      collection(firestore, productRoute),
      snapshot => {
        const fetchedData: ProductInterface[] = [];
        snapshot.forEach(doc => {
          fetchedData.push({
            ...(doc.data() as ProductInterface),
            productId: doc.id,
          });
        });

        const updatedProducts: Record<string, ProductInterface> = {};
        for (const product of fetchedData) {
          updatedProducts[product.productId] = {...product};
        }

        setProduct(prevState => ({
          ...prevState,
          allProducts: updatedProducts,
          isProductLoading: false,
        }));
      },
    );

    return () => {
      unsubscribe();
    };
  }, [setProduct]);
};
export const updateProduct = async (
  productId: string,
  newProduct: any,
  setProduct: any,
  setSnackBar: any,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));

  const productIdRef = doc(firestore, productRoute, productId);

  try {
    await updateDoc(productIdRef, newProduct);
    setProduct((prevState: AllProductState) => ({
      ...prevState,
      isProductLoading: false,
    }));
    snackBarSuccess('Product updated successfully', 'success', setSnackBar);
  } catch (error: any) {
    snackBarFailure('Failed To update Product', 'error', setSnackBar);
  }
};

export const removeProduct = async (
  productId: string,
  setProduct: any,
  setSnackBar: any,
) => {
  setProduct((prevState: AllProductState) => ({
    ...prevState,
    isProductLoading: true,
  }));

  try {
    const success = await removeInDatabase(productRoute, productId);

    if (success) {
      setProduct((prev: AllProductState) => {
        const newState = {...prev};
        newState.allProducts = {...newState.allProducts};
        delete newState.allProducts[productId];
        return newState;
      });
      snackBarSuccess('Product deleted successfully', 'success', setSnackBar);
    }
  } catch (error) {
    snackBarFailure('Failed to delete product', 'error', setSnackBar);
  }
};

const updateProductAll = async () => {
  try {
    const collectionRef = collection(firestore, 'products');

    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach(doc => {});
  } catch (error) {}
};
