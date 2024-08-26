// PaymentPage.js
import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity,FlatList, StyleSheet } from 'react-native';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');

  const handlePayment = () => {
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVC:', cvc);
  };
  const imageList = [
    {
      id: '1',
      uri: 'https://th.bing.com/th/id/R.4b2f00bf3b1045b86fdeb769c40cc8f9?rik=O%2f9Sqi9xHpMtuQ&pid=ImgRaw&r=0',
    },
  ];
  const textinfo=[
    {
      
        id:'1',
        
    }
  ];
  const nCols = 2;
  const renderGridItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.imageItem} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Payment Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={(text) => setExpiryDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CVC"
        keyboardType="numeric"
        value={cvc}
        onChangeText={(text) => setCVC(text)}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F5F5DC',
    padding:10,
  },
  info:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
  },
  payButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  flatListContent: {
    justifyContent: 'space-between',
  },
});

export default PaymentPage;
