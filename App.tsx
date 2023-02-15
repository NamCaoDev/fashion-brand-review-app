import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'
import RootTabNavigatorScreen from './screens/RootTabNavigator'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Platform, UIManager } from 'react-native'
import { enableScreens } from 'react-native-screens'

// if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true)
// enableScreens(true)
// GoogleSignin.configure({
//   webClientId: '183049042466-4g5fhne6ucvepedcr6focf31h1gvsmaq.apps.googleusercontent.com',
// })

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
