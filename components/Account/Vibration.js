import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, Vibration, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { updateVibrationStatus } from "../redux/chats";

const VibrationComponent = () => {
  // const dispatch = useDispatch();
  // const { isVibrationEnabled } = useSelector((state) => state.chats);
  //   console.log(isVibrationEnabled);
  const isVibrationEnabled = false;
  const toggleVibrationPreference = async () => {
    try {
      await AsyncStorage.setItem(
        "vibrationEnabled",
        JSON.stringify(!isVibrationEnabled)
      );
      // dispatch(updateVibrationStatus(!isVibrationEnabled));
    } catch (error) {
      console.error("Error saving vibration preference:", error);
    }
  };

  const loadVibrationPreference = async () => {
    try {
      const value = await AsyncStorage.getItem("vibrationEnabled");

      if (value !== null) {
        const parsedValue = JSON.parse(value);

        // dispatch(updateVibrationStatus(parsedValue));
      }
    } catch (error) {
      console.error("Error loading vibration preference:", error);
    }
  };

  // useEffect(() => {
  //   loadVibrationPreference();
  // }, [isVibrationEnabled]);

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <Text>Vibration Enabled: {isVibrationEnabled ? "Yes" : "No"}</Text>
      <Switch
        value={isVibrationEnabled}
        onValueChange={toggleVibrationPreference}
      />
    </View>
  );
};

export default VibrationComponent;
