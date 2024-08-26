import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker ,TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RegisterScreen({ navigation }) {
  const [name, setFName] = useState('');
  const [surname, setSName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [password, setPass] = useState('');
  const [confPassword, setConfPass] = useState('');

  const provinces = ['Please Select a Province','Limpopo', 'Gauteng', 'North West', 'Mpumalanga', 'Kwa-Zulu Natal', 'Western Cape', 'Eastern Cape', 'Northen Cape'];

  const handleRegister = () => {
    try {
      fetch('http://localhost:5000/api/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, surname, email, phone, Address, password, confPassword
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.err) {
           alert('Incorrect email or password. Please try again.'); 
           console.log(data.err);      
          } else {
            console.log(data);
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
    // Assuming a successful registration, navigate to the 'LoginScreen'
  };
  const handlesignin=()=>{
    navigation.navigate('login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        onChangeText={(text) => setFName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        onChangeText={(text) => setSName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfPass(text)}
      />
      <TouchableOpacity style = {styles.RegButton} onPress={handleRegister}>
        <Text style = {styles.signup}>Sign Up</Text>        
      </TouchableOpacity>
      <Text style = {styles.btn}>Already have an Account ? <TouchableOpacity onPress = {handlesignin}>Click here</TouchableOpacity></Text>

      
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
  header: {
    fontSize: 30,
    marginBottom: 16,
    color:'black',
    
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor:'white',
    borderColor: 'gray',
    borderRadius:8,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  RegButton:{
    backgroundColor: 'black',
    margin: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
 
  },
  signup:{
    color: 'white',
  },
  btn:{

    color: 'black',

  },

});
