import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  fetchAllChat,
  createMessage,
  updateUnreadMessage,
} from '../../actions/chatActions';
import {
  customerSpecificChat,
  messageNotificationForCustomer,
  useAllChatState,
} from '../../recoilState/chatState';
import {useUserState} from '../../recoilState/userState';
import {useSnackBarState} from '../../recoilState/snacbarState';
import {Message} from '../../recoilState/chatState';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle from '../../../constants/globalStyle';
import moment from 'moment';

const {width} = Dimensions.get('screen');

const ContactUs = () => {
  fetchAllChat();
  const [message, setMessage] = useState('');
  const {setSnackBar} = useSnackBarState();
  const {currentUser} = useUserState();
  const {allChat} = useAllChatState();
  const uniqueDialogues = customerSpecificChat(
    currentUser?.userId || '',
    allChat,
  );
  const extractUnreadMessage = messageNotificationForCustomer(
    currentUser?.userId || '',
    allChat,
  );

  const unreadLength = extractUnreadMessage.length;

  const handleUpdateUnread = () => {
    updateUnreadMessage(extractUnreadMessage, setSnackBar);
  };

  useEffect(() => {
    if (unreadLength > 0) {
      handleUpdateUnread();
    }
  }, [unreadLength]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const messageData = {
      timestamp: new Date().getTime(),
      message: message,
      email: currentUser?.email,
      role: currentUser?.role,
      senderType: 'customer',
      status: 'Unread',
      customerId: currentUser?.userId,
      alignmentKey: currentUser?.userId,
      userName: currentUser?.userName,
    };
    createMessage(messageData as Message, setSnackBar);
    setMessage('');
  };

  if (!currentUser?.email) return null;

  return (
    <View style={styles.container}>
      {!uniqueDialogues.length && (
        <Text style={styles.welcomeText}>
          Hello {currentUser?.userName} welcome to ShopEase customer support
          chat! 😊 How can we assist you today?
        </Text>
      )}
      <View style={styles.content}>
        {currentUser?.userId ? (
          <ScrollView
            style={styles.messages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContainer}>
            {uniqueDialogues.map((data: any) => (
              <View
                key={data.chatId}
                style={{
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    ...(data.alignmentKey === currentUser?.userId && {
                      ...styles.avatarMessCon,
                    }),
                  }}>
                  {data.alignmentKey === currentUser?.userId && (
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                      }}
                      style={styles.avatar}
                    />
                  )}
                  <View
                    style={{
                      ...styles.message,
                      ...(data.alignmentKey === currentUser?.userId && {
                        alignSelf: 'flex-start',
                        backgroundColor: globalStyle.COLORS.GRADIENT_START,
                      }),
                    }}>
                    <Text
                      style={{
                        ...styles.messageText,
                        ...(data.alignmentKey === currentUser?.userId && {
                          color: 'white',
                        }),
                      }}>
                      {data.message}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    ...(data.alignmentKey === currentUser?.userId && {
                      alignSelf: 'flex-start',
                    }),
                  }}>
                  <Text
                    style={{
                      ...styles.messageText,
                      fontSize: 10,
                      color: 'grey',
                      ...(data.alignmentKey === currentUser?.userId && {
                        left: '12%',
                      }),
                    }}>
                    {moment(new Date(data.timestamp).toISOString()).format(
                      'h:mm A',
                    )}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : null}

        <View style={styles.messageInput}>
          <TouchableOpacity onPress={handleSendMessage}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: globalStyle.COLORS.MUTED}}
            />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Message"
            style={styles.input}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.COLORS.BACKGROUND,
  },

  welcomeText: {
    textAlign: 'center',
    marginTop: 100,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarMessCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  messages: {
    flexGrow: 1,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    maxWidth: '70%',
    borderRadius: 8,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    color: 'black',
  },
  messageText: {
    color: 'black',
    paddingVertical: 2,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    width: width / 1.3,
    marginLeft: 15,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default ContactUs;
