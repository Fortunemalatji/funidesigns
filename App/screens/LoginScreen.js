import React, { useState } from 'react';
import { View, Text, Image,TextInput, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import axios from 'axios';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.err) {
           alert('Incorrect email or password. Please try again.'); 
           console.log(data.err);      
          } else {
            console.log(data.token);
            //navigation.navigate('Events');
            //Save token to localStorage or cookie
            const sessionToken = data.token;
            const expirationDays = 7;
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);

            document.cookie = `sessionToken=${sessionToken}; expires=${expirationDate.toUTCString()}; path=/`;
            navigation.navigate('Events');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error logging in. Please try again.');
        });
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in. Please try again.');
    }
  };
  const getQuote = ()=>{
  axios.get('http://localhost:3000/api/products').then(res=>{
    console.log(res)

  }).catch(err=>{
    console.log(err)

  })
  }
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <Image 
    

      style={styles.profileImage}
      />
     
      </TouchableOpacity>
      <Text style={styles.header}></Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style = {styles.btnforgot} onPress = {getQuote}>
        <Text style={styles.btn} >Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.login} onPress ={handleLogin}>
        <Text style = {styles.btn1}>Sign in</Text>
      </TouchableOpacity >

      
        <Text style = {styles.btn}>Don't have an Account already? <TouchableOpacity onPress = {getQuote}>Click here</TouchableOpacity></Text>
      
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#F5F5DC',
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    boxShadow:'0 2px 4px rgba(0,0,0,0,5)',
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

    color: 'black',

  },
  btn1:{

    color: 'white',

  },
  btnforgot:{
    alignItems:'flex-end',
  },
});
