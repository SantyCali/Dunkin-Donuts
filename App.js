// App.js
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store'
import MainNavigator from './src/navigation/MainNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast, { BaseToast } from 'react-native-toast-message'
import 'react-native-gesture-handler';


SplashScreen.preventAutoHideAsync()



export default function App() {
  const [loaded, error] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-Light': require('./assets/fonts/Karla-Light.ttf'),
    'Karla-Italic': require('./assets/fonts/Karla-Italic.ttf'),
    'Pacifico-Regular': require('./assets/fonts/Pacifico-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync()
  }, [loaded, error])

  if (!loaded && !error) return null

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <MainNavigator />
        <Toast config={toastConfig} position="bottom" bottomOffset={100} />
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({})

//Toast
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#F36B1D',
        backgroundColor: '#1f1f1f',
        borderRadius: 12,
        width: 220,
        alignSelf: 'flex-end',
        marginRight: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Karla-Bold',     
        fontSize: 12,
        color: '#ddd',
        fontFamily: 'Karla-Regular', 
      }}
    />
  ),
}

