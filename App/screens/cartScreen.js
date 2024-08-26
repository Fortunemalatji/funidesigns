import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
//import Footer from '/App/screens/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Chair',
      image: 'https://i5.walmartimages.com/asr/d74f9558-9369-4f91-842a-10df88d7d083_2.09a3f71391cdfb6b7fedda8e44266a30.jpeg', // Replace with a valid image URL
      description: 'A comfortable wooden chair with a modern design.',
      price: 1150.00,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Table',
      image: 'https://www.greenleafhome.co.za/greenleafnew/wp-content/uploads/2022/05/Bragg-Boston-Round-Coffee-Table-510x510.jpg', // Replace with a valid image URL
      description: 'A stylish dining table made from solid oak.',
      price: 700.00,
      quantity: 1,
    },
  ]);

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemDescription}>{item.description}</Text>
        <Text style={styles.cartItemPrice}>R{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>R{getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('checkout')}>
        <Text style={styles.checkoutButtonText} >Checkout</Text>
      </TouchableOpacity>
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    marginVertical: 15,
    overflow: 'hidden',
  },
  cartImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: 'cover',
  },
  cartDetails: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  cartItemDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  cartItemPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#E9D8B7',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    marginVertical: 20,
  },
  totalText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 30,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  flatListContent: {
    paddingVertical: 20,
  },
});

export default CartPage;
