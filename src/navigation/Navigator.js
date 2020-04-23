import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Login from '../components/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Home from '../components/Home';
import Bitcoin from '../components/Bitcoin';

const Stack = createStackNavigator();

const config = {
  BitCoinStack: {
    path: 'stack',
    initialRouteName: 'BitCoin',
    screens: {
      BitCoin: {
        path: 'bitcoin/:token',
        parse: {
          token: String,
        },
      },
    },
  },
};

export default function Navigator() {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://bitcoin.com', 'mybitcoin://'],
    config,
    getStateFromPath: (path) => {
      console.log('Path ', path);
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise((resolve) => setTimeout(resolve, 150)),
    ])
      .catch((e) => {
        console.error(e);
      })
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer initialState={initialState} ref={ref}>
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={Login} /> */}
          {/* <Stack.Screen name="Home" component={Home} /> */}
          <Stack.Screen name="BitCoinStack" component={Bitcoin} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
