import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens 
import LandingPage from './App/screens/LandingPage';
import RegisterScreen from './App/screens/RegisterScreen';
import LoginScreen from './App/screens/LoginScreen';
import eventPage from './App/screens/eventScreen';
import pay from './App/screens/paymentscreen';
import Open from './App/screens/Open';
import cartScreen from './App/screens/cartScreen';
import Checkout from './App/screens/Checkout';
import Custom from './App/screens/customization';
import myorders from './App/screens/myOrderScreen';
import profile from './App/screens/profile';
import Notification from './App/screens/notifications';
import Footer from './App/screens/Footer';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen name="eventpage" component={eventPage}/>
        <Stack.Screen name="Events"  component={LandingPage}/>
        <Stack.Screen name="login" component={LoginScreen}/>
        <Stack.Screen name="register" component={RegisterScreen}/>
        <Stack.Screen name="pay" component={pay}/>
        <Stack.Screen name="profile" component={profile}/>
        <Stack.Screen name="open" component = {Open}/>
        <Stack.Screen name="custom" component = {Custom}/>
        <Stack.Screen name="cart" component = {cartScreen}/>
        <Stack.Screen name="checkout" component = {Checkout}/>
        <Stack.Screen name="footer" component = {Footer}/>
        <Stack.Screen name="myorder" component={myorders}/>
        <Stack.Screen name="notification" component={Notification}/>






      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;