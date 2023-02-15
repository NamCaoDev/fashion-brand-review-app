import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Provider as ReduxProvider } from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'

import { store } from './store'
import HomeScreen from './screens/HomeScreen'
import BrandScreen from './screens/BrandScreen'
import ProductScreen from './screens/ProductScreen'
import RootTabNavigatorScreen from './screens/RootTabNavigator'

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <ReduxProvider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={RootTabNavigatorScreen} name="RootTab" options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </ReduxProvider>
  )
}
