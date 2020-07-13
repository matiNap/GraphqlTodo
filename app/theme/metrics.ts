import { Platform, StatusBar, Dimensions } from 'react-native';

const height = Dimensions.get('screen').height;

export default {
  statusBarHeight:
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  width: Dimensions.get('screen').width,
  height,
  headerHeight: height * 0.15,
};
