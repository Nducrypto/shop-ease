import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

Feather.loadFont();
EvilIcons.loadFont();

export const screens = [
  {label: 'Home', icon: 'home', screen: 'Home Screen', IconType: Feather},
  {label: 'Woman', icon: 'users', screen: 'Woman', IconType: Feather},
  {label: 'Man', icon: 'users', screen: 'Man', IconType: Feather},
  {label: 'Kids', icon: 'menu', screen: 'Kids', IconType: Entypo},
  {
    label: 'Profile',
    icon: 'user',
    screen: 'Profile Screen',
    IconType: EvilIcons,
  },
  {
    label: 'Settings',
    icon: 'cog',
    screen: 'Settings Screen',
    IconType: Entypo,
  },
  // {label: 'Cart', icon: 'menu', screen: 'Cart', IconType: Entypo},
];
