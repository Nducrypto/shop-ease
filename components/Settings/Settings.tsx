import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {payment, privacy, recommended} from './settingsData';
import globalStyle from '../../constants/globalStyle';

function Settings() {
  const [isSwitchActive, setIsSwitchActive] = useState<any>({
    faceId: false,
    autoLock: false,
  });
  const {navigate} = useNavigation<any>();

  const toggleSwitch = (switchNumber: string) => {
    if (switchNumber === 'face') {
      setIsSwitchActive((prev: any) => ({
        [switchNumber]: !prev.faceId,
      }));
    } else if (switchNumber === 'autolock') {
      setIsSwitchActive((prev: any) => ({
        [switchNumber]: !prev.autoLock,
      }));
    }
  };
  interface Props {
    title: string;
    id: string;
    type: string;
  }
  const renderItem = ({item}: {item: Props}) => {
    switch (item.type) {
      case 'switch':
        return (
          <View style={styles.titleAndSwiCon}>
            <Text style={{fontSize: 14}}>{item.title}</Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
              }
              trackColor={{
                false: globalStyle.COLORS.SWITCH_OFF,
                true: globalStyle.COLORS.SWITCH_ON,
              }}
              value={isSwitchActive[item.id]}
            />
          </View>
        );
      case 'button':
        return (
          <View style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.title)}>
              <View
                style={{
                  paddingTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14}}>{item.title}</Text>
                <FontAwesome
                  name="angle-right"
                  style={{paddingRight: 5}}
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        break;
    }
  };

  return (
    <View>
      <FlatList
        data={recommended}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem as any}
        ListHeaderComponent={
          <View style={styles.titleCon}>
            <Text style={styles.headerLabel}>Recommended Settings</Text>
            <Text style={{fontSize: 12, textAlign: 'center'}}>
              These are the most important settings
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      />
      <View style={styles.titleCon}>
        <Text style={styles.headerLabel}>Payment Settings</Text>
        <Text style={{fontSize: 12, textAlign: 'center'}}>
          These are also important settings
        </Text>
      </View>
      <FlatList
        data={payment}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      />
      <View style={styles.titleCon}>
        <Text style={styles.headerLabel}>Privacy Settings</Text>
        <Text style={{fontSize: 12, textAlign: 'center'}}>
          Third most important settings
        </Text>
      </View>
      <FlatList
        data={privacy}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      />
    </View>
  );
}
export default Settings;
const styles = StyleSheet.create({
  settings: {
    paddingVertical: 15,
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  titleCon: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleAndSwiCon: {
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rows: {
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 2,
  },
});
