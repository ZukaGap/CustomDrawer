import {StyleSheet} from 'react-native';

const getStyleObj = () => {
  return StyleSheet.create({
    headerWrapper: {
      marginHorizontal: 32,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginLeft: 32,
      fontSize: 22,
      color: 'grey',
      letterSpacing: 6,
    },
  });
};

export default getStyleObj;
