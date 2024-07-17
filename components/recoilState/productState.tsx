import {atom, useRecoilState} from 'recoil';

export interface ProductInterface {
  title: string;
  brand: string;
  productId: string;
  price: number;
  image: string[];
  discountedPrice?: number;
  productDetail?: string;
  likes: string[];
  category?: string;
}

export interface AllProductState {
  allProducts: Record<string, ProductInterface>;
  isProductLoading: boolean;
  isProductError: boolean;
  currentId: string;
}

export const productState = atom<AllProductState>({
  key: 'productKey',
  default: {
    allProducts: {},
    isProductLoading: false,
    isProductError: false,
    currentId: '',
  },
});

export const useProductState = () => {
  const [product, setProduct] = useRecoilState(productState);
  const {isProductLoading, isProductError, currentId} = product;
  const allProducts = Object.values(product.allProducts);
  const unique = new Set(['All']);
  for (const item of allProducts) {
    if (!unique.has(item.brand)) {
      unique.add(item.brand);
    }
  }
  const uniqueBrandsForSearch = Array.from(unique);
  return {
    allProducts,
    isProductLoading,
    isProductError,
    currentId,
    setProduct,
    uniqueBrandsForSearch,
  };
};

export const updateCurrentId = (setProduct: any, productId: string) => {
  setProduct((prev: AllProductState) => ({...prev, currentId: productId}));
  return true;
};
