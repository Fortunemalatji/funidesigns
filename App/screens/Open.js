import React, { useState } from 'react';
import { View, Text, Image,TextInput, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import axios from 'axios';
//import profilePic from '/App/assets/home.JPG';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =() => {
    navigation.navigate('login');
    
  };
  const getQuote = ()=>{
  axios.get('https://localhost:7248/api/user').then(res=>{
    console.log(res)

  }).catch(err=>{
    console.log(err)

  })
  }
  const handlereg = ()=>{
    navigation.navigate('register');
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <Image 
      style={styles.profileImage}
      />
     
      </TouchableOpacity>
      
      
      <TouchableOpacity style = {styles.login} onPress ={handleLogin}>
        <Text style = {styles.btn}>Sign in</Text>
      </TouchableOpacity >

      <TouchableOpacity style = {styles.login} onPress ={handlereg}>
        <Text style = {styles.btn}>Sign Up</Text>
      </TouchableOpacity >
      <Text style={styles.terms}>By tapping Sign Up/sign in you agree to our <TouchableOpacity style={styles.tcs}>Terms of use</TouchableOpacity> and <TouchableOpacity style={styles.tcs}>privacy policy</TouchableOpacity></Text>
      
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#E9D8B7',
  },
  profileImage: {
    width: 400,
    height: 400,
    boxShadow:'0 5px 8px rgba(0,0,0,0,5)',
    borderRadius:200,
  },
  header: {
    fontSize: 40,
    fontStyle:'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    boxShadow:'0 2px 4px rgba(0,0,0,0,5)',

  },
  login: {
    backgroundColor: 'black',
    margin: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  btn:{

    color: 'white',

  },
  btnforgot:{
    alignItems:'flex-end',
  },
  terms:{
   paddingTop: 26,
  },
  tcs:{
    color:'white',
  },
});
