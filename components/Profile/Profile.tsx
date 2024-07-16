import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, theme} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import globalStyle from '../../constants/globalStyle';
import {HeaderHeight, height, width} from '../actions/utils';
import {useNavigation} from '@react-navigation/native';
import {useProductState} from '../recoilState/productState';
import {useUserState} from '../recoilState/userState';
import {
  messageNotificationForCustomer,
  useAllChatState,
} from '../recoilState/chatState';
import {useOrderState, userOrdersHistory} from '../recoilState/orderState';
import {getAllOrders} from '../actions/orderActions';
FontAwesome.loadFont();
AntDesign.loadFont();

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  getAllOrders();
  const navigation = useNavigation<any>();
  const {allProducts, isProductLoading} = useProductState();
  const {currentUser} = useUserState();
  const {allChat} = useAllChatState();
  const extractUnreadMessage = messageNotificationForCustomer(
    currentUser?.userId || '',
    allChat,
  );

  const {isOrderLoading} = useOrderState();
  const totalOrders = userOrdersHistory(currentUser?.email || '').length;

  const unreadMessageLength = extractUnreadMessage.length;
  //
  return (
    <View style={styles.profile}>
      <View>
        <ImageBackground
          source={{
            uri: currentUser?.profilePic
              ? currentUser?.profilePic
              : 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
          }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <View style={styles.profileDetails}>
            <View style={styles.profileTexts}>
              <Text style={{paddingBottom: 8, fontSize: 20, color: 'white'}}>
                {currentUser?.userName}
              </Text>
              <View style={styles.nameAndLoCon}>
                <View style={styles.proCon}>
                  <View style={styles.pro}>
                    <Text style={styles.sharedText}>Pro</Text>
                  </View>
                  <Text style={styles.seller}>Seller</Text>
                  <Text
                    style={{color: globalStyle.COLORS.WARNING, fontSize: 16}}>
                    4.8 <AntDesign name="star" size={14} />
                  </Text>
                </View>
                <View>
                  <Text style={{color: globalStyle.COLORS.MUTED, fontSize: 16}}>
                    <FontAwesome
                      name="map-marker"
                      color={globalStyle.COLORS.MUTED}
                      size={16}
                    />{' '}
                    {currentUser?.location || 'Los Angeles, CA'}
                  </Text>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={styles.gradient}
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.options}>
        <View style={styles.labelSection}>
          <TouchableWithoutFeedback>
            <View style={styles.labelCon}>
              <Text style={styles.value}>{totalOrders}</Text>
              <Text style={styles.label}>Orders</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <View style={styles.labelCon}>
              <Text style={styles.value}>0</Text>
              <Text style={styles.label}>Bids & Offers</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Contact Us')}>
            <View style={styles.labelCon}>
              <Text style={styles.value}>{unreadMessageLength}</Text>
              <Text style={styles.label}>Messages</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.viewLabelCon}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>
            Recently viewed
          </Text>
          <Text
            style={{fontSize: 12, color: globalStyle.COLORS.GRADIENT_START}}
            onPress={() => navigation.navigate('Home Screen')}>
            View All
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: HeaderHeight && -HeaderHeight * 2}}>
            <View style={styles.recentlyViewed}>
              {allProducts.slice(0, 6).map((item, imgIndex) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      ...item,
                    })
                  }
                  key={`viewed-${imgIndex}`}>
                  <Image
                    source={{uri: item.image[0]}}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    marginBottom: HeaderHeight && -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: height / 2,
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    flex: 1,
    // paddingTop: 16 * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },

  nameAndLoCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profileTexts: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    zIndex: 2,
  },
  proCon: {
    flexDirection: 'row',
  },
  pro: {
    backgroundColor: globalStyle.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 10,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  sharedText: {
    fontSize: 14,
    color: 'white',
  },
  seller: {
    marginRight: 10,
    color: 'white',
    fontSize: 14,
  },
  options: {
    position: 'relative',
    padding: 15,
    marginHorizontal: 12,
    marginTop: -15,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    height: height / 2,
  },
  labelSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelCon: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'black',
  },
  value: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  viewLabelCon: {
    paddingVertical: 16,
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  recentlyViewed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Profile;
