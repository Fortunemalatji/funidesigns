import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
//import Footer from './Footer'; 
import { SafeAreaView } from 'react-native-web';
//import img from '/App/assets/chair.jpg';

const CheckoutScreen = ({ navigation }) => {
  // Dummy data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Custom Sofa',
      details: 'Blue, Leather',
      price: '$499.99',
      image: img,
    },
    {
      id: 2,
      name: 'Dining Table',
      details: 'Wood, 6-Seater',
      price: '$699.99',
      image: img,
    },
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleOrderSubmit = () => {
    // Add order submission logic here
    Alert.alert('Order Submitted', 'Your order has been placed successfully!');
    navigation.navigate('Home'); // Navigate to home or order confirmation page
  };

  return (
    <SafeAreaView style={styles.safev}>
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.details}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.shippingSection}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingInfo.name}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, postalCode: text })}
        />
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={handleOrderSubmit}>
        <Text style={styles.orderButtonText}>Submit Order</Text>
      </TouchableOpacity>

      
    </View>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safev:{
    height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDesc: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
  shippingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
