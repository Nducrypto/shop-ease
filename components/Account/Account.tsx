import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, signOut } from "../config/firebase";
import { styles } from "./accountStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import VibrationComponent from "./Vibration";
import { useUserState } from "../recoilState/userState";

interface ArrayData {
  text: string;
  url: string;
}
const Account = () => {
  const navigation = useNavigation() as any;
  const { currentUser } = useUserState();

  const data: ArrayData[] = [
    { text: "View Order", url: "Order" },
    { text: "View Cart", url: "CartPage" },
    ...(currentUser?.role === "Admin"
      ? [
          { text: "Customer Care", url: "CustomerCare" },
          { text: "Add Product", url: "AddProduct" },
        ]
      : []),
    { text: "Contact Us", url: "ContactUs" },
  ];

  async function handleLogout() {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {}
  }

  const handleNavigate = (item: ArrayData) => {
    if (item && item.url === "Order") {
      navigation.navigate(item.url, {
        email: currentUser?.email,
      });
    } else if (item && item.url === "ContactUs") {
      navigation.navigate(item.url, {
        role: currentUser?.role,
        email: currentUser?.email,
        customerId: currentUser?.userId,
      });
    } else {
      navigation.navigate(item.url);
    }
  };

  return (
    <View>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleNavigate(item)}
          style={styles.container}
        >
          <Text style={styles.text}> {item.text}</Text>

          <Icon name="angle-right" size={25} color="grey" />
        </TouchableOpacity>
      ))}
      <VibrationComponent />
      {currentUser?.email && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutCon}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Account;
