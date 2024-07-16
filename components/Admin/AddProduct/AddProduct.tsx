import React, { useEffect, useState } from "react";

import { addProduct, updateProduct } from "../../actions/productActions";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Products from "../../ProductsList/Products";
import {
  ProductInterface,
  updateCurrentId,
  useProductState,
} from "../../recoilState/productState";
import { useSnackBarState } from "../../recoilState/snacbarState";

interface NewProduct {
  model: string;
  productDetail: string;
  brand: string;
  discountedPrice: number | string;
  price: number | string;
  likes: string[];
  image: string[];
  category: string;
}
const initialState: NewProduct = {
  model: "",
  productDetail: "",
  brand: "",
  discountedPrice: "",
  price: "",
  likes: [],
  image: [],
  category: "",
};

const AddProduct = () => {
  const [productForm, setProductForm] = useState<NewProduct | ProductInterface>(
    initialState
  );
  const { allProducts, currentId, setProduct } = useProductState();
  const { setSnackBar } = useSnackBarState();
  const productToUpdate = allProducts.find(
    (item) => item.productId === currentId
  );

  function handleNewProductChange(name: string, value: string) {
    if (name === "image") {
      setProductForm((prevProduct) => ({
        ...prevProduct,
        [name]: value.split(",").map((item: string) => item.trim()),
      }));
    } else {
      setProductForm((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    if (currentId && productToUpdate !== undefined) {
      setProductForm(productToUpdate);
    }
  }, [currentId]);

  function createProductHandler() {
    const data = {
      ...productForm,
      price: Number(productForm.price),
      discountedPrice: Number(productForm.discountedPrice),
    };
    if (currentId.length < 1) {
      addProduct(data as ProductInterface, setProduct, setSnackBar);
    } else {
      updateProduct(currentId, data, setProduct, setSnackBar);
    }
    setProductForm(initialState);
    updateCurrentId(setProduct, "");
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <ScrollView horizontal style={{ margin: 20, gap: 50 }}>
          {allProducts.map((product) => (
            <View key={product.productId} style={{ marginTop: 16 }}>
              <Products product={product} />
            </View>
          ))}
        </ScrollView>
        <Text style={{ textAlign: "center" }}>
          You have {allProducts.length} products in Stock
        </Text>
        <View style={{ margin: 20 }}>
          <Text>Add New Product</Text>
          <Text>Model:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={productForm.model}
            onChangeText={(text) => handleNewProductChange("model", text)}
          />
          <Text>Brand:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={productForm.brand}
            onChangeText={(text) => handleNewProductChange("brand", text)}
          />
          <Text>Product Detail:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              height: 100,
            }}
            value={productForm.productDetail}
            onChangeText={(text) =>
              handleNewProductChange("productDetail", text)
            }
            multiline
          />
          <Text>Price:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={productForm.price.toString()}
            onChangeText={(value) => handleNewProductChange("price", value)}
            keyboardType="numeric"
          />
          <Text>Discounted Price:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={productForm.discountedPrice?.toString()}
            onChangeText={(value) =>
              handleNewProductChange("discountedPrice", value)
            }
            keyboardType="numeric"
          />
          <Text>Image URL:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={productForm.image.join(", ")}
            onChangeText={(text) => handleNewProductChange("image", text)}
          />
          <Button title="Add Product" onPress={createProductHandler} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddProduct;
