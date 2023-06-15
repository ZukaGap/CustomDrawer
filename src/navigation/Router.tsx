import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ExampleScreen from 'screens/ExampleScreen';
import {RouterNavigatorParamsList} from 'types/navigationTypes';

const {Navigator, Screen} =
  createNativeStackNavigator<RouterNavigatorParamsList>();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({}) => ({
          gestureEnabled: true,
          headerShown: false,
          headerBackTitleVisible: false,
          headerBackButtonMenuEnabled: false,
        })}
        initialRouteName="Example">
        <Screen
          key={'ExampleScreen0'}
          name={'Example'}
          component={ExampleScreen}
          options={{headerShown: false}}
        />
        <Screen
          key={'ExampleScreen1'}
          name={'Example1'}
          component={ExampleScreen}
          options={{headerShown: false}}
        />
        <Screen
          key={'ExampleScreen2'}
          name={'Example2'}
          component={ExampleScreen}
          options={{headerShown: false}}
        />
        <Screen
          key={'ExampleScreen3'}
          name={'Example3'}
          component={ExampleScreen}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
