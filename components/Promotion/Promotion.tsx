import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./promostyles";
import { useProductState } from "../recoilState/productState";
import { ProductInterface } from "../recoilState/productState";

const Promotions = () => {
  const { allProducts } = useProductState();
  const navigation = useNavigation() as any;

  const handlePromotionClick = (product: ProductInterface) => {
    navigation.navigate("ProductDetail", { ...product });
  };

  return (
    <View style={styles.promotionsSection}>
      <Text style={styles.sectionHeading}>Promotions and Discounts</Text>
      <View>
        <TouchableOpacity
          style={styles.promotionCard}
          onPress={() => handlePromotionClick(allProducts[14])}
        >
          <View style={styles.promotionImage}>
            <Image
              source={{
                uri: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/1538632/1.jpg?0776",
              }}
              style={styles.promotionImage}
            />
          </View>
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionTitle}>Special Sale!</Text>
            <Text style={styles.promotionDescription}>
              Get 20% off on selected items. Limited time offer.
            </Text>
            <TouchableOpacity
              style={styles.promotionButton}
              onPress={() => handlePromotionClick(allProducts[14])}
            >
              <Text style={styles.buttonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.promotionCard}>
          <View style={styles.promotionImage}>
            <Image
              source={{
                uri: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/10/0899931/1.jpg?9097",
              }}
              style={styles.promotionImage}
            />
          </View>
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionTitle}>Summer Collection</Text>
            <Text style={styles.promotionDescription}>
              Explore our latest summer collection. Up to 30% off.
            </Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Promotions;
