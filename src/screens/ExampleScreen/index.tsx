import React, {useRef} from 'react';
import {StatusBar} from 'react-native';

import {DrawerWrapper, Header} from 'components';

import getStyleObj from './style';

const StartScreen = ({}) => {
  const styles = getStyleObj();
  const drawerRef = useRef(null);

  return (
    <DrawerWrapper ref={drawerRef}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Header
        onPress={() => {
          drawerRef?.current.openDrawer();
        }}
      />
    </DrawerWrapper>
  );
};

export default StartScreen;
