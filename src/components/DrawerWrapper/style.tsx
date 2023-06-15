import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const getStyleObj = ({}) => {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: '#FFF',
    },
    drawerWrapper: {
      backgroundColor: '#003060',
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
    },
    root: {
      backgroundColor: '#FFF',
      width: width,
      height: height,
    },
    drawerContent: {
      marginTop: 100,
      width: '40%',
      justifyContent: 'center',
    },
    userName: {
      textAlign: 'center',
      fontSize: 24,
      color: 'white',
    },
    screensWrapper: {
      marginTop: 64,
      marginLeft: 16,
    },
    screensTitle: {
      textAlign: 'left',
      fontSize: 18,
      color: 'white',
    },
    screenBTN: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    logout: {
      marginTop: 64,
      alignItems: 'center',
    },
    logoutBTN: {
      paddingTop: 64,
      marginLeft: 16,
      paddingHorizontal: 32,
      borderTopWidth: 1,
      borderColor: 'grey',
    },
    logoutT: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white',
    },
    screenBTNActive: {
      backgroundColor: 'rgba(166,0,0,0.4)',
    },
    screensTitleActive: {
      color: 'rgba(222,0,0,1)',
    },
  });
};

export default getStyleObj;
