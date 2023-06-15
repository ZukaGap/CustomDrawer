import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {HeaderProps} from 'types/headerTypes';

import getStyleObj from './style';
import {Drawer} from 'assets/SVG';

const Header: React.FC<HeaderProps> = ({onPress}) => {
  const styles = getStyleObj();
  const route = useRoute();

  const handleOnPress = useCallback(() => {
    try {
      onPress();
    } catch (err) {}
  }, [onPress]);

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={handleOnPress}>
        <Drawer fill={'grey'} width={32} height={32} />
      </TouchableOpacity>
      <Text style={styles.title}>{route.name}</Text>
    </View>
  );
};

export default Header;
