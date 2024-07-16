import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useUserState } from "../recoilState/userState";

const ProfileIcon = () => {
  const { currentUser, isUserLoading } = useUserState();

  const navigation: { navigate: any } = useNavigation();
  const handleNavigate = () => {
    if (currentUser?.email) {
      navigation.navigate("Account");
    }
  };

  if (isUserLoading) {
    return null;
  }

  if (!isUserLoading && !currentUser?.email) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <Icon name="user" style={{ marginLeft: 20 }} size={25} color="purple" />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
