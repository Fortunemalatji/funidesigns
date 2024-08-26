import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
//import Footer from '/App/screens/Footer';
import { SafeAreaView } from 'react-native-web';
//import img from '/App/assets/chair.jpg';

const OrderPage = () => {
  // Dummy order data
  const dummyOrders = [
    {
      order_id: 1,
      prod_name: 'Modern Sofa',
      cus_Type: 'Material',
      cus_Option: 'Leather',
      components: JSON.stringify([
        { comp_Name: 'Seat Cushion', comp_Type: 'Cushion' },
        { comp_Name: 'Back Cushion', comp_Type: 'Cushion' },
      ]),
      quantity: 1,
      price: 999.99,
      image: 'https://th.bing.com/th/id/OIP.kr2QUhvBwCO6JoqbuQR7HQAAAA?rs=1&pid=ImgDetMain', // Placeholder image URL
    },
    {
      order_id: 2,
      prod_name: 'Dining Table',
      cus_Type: 'Finish',
      cus_Option: 'Mahogany',
      components: JSON.stringify([
        { comp_Name: 'Tabletop', comp_Type: 'Wood' },
        { comp_Name: 'Legs', comp_Type: 'Wood' },
      ]),
      quantity: 1,
      price: 799.99,
      image: 'https://th.bing.com/th/id/OIP.kr2QUhvBwCO6JoqbuQR7HQAAAA?rs=1&pid=ImgDetMain',
    },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.image }} style={styles.orderImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.productName}>{item.prod_name}</Text>
        <Text style={styles.customization}>Type: {item.cus_Type}</Text>
        <Text style={styles.customization}>Option: {item.cus_Option}</Text>
        <Text style={styles.customization}>
          Components: {JSON.parse(item.components).map(comp => comp.comp_Name).join(', ')}
        </Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.total}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safev}>
    <View style={styles.container}>
      <FlatList
        data={dummyOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.order_id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safev:{
    height: '100%',

  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 10,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderImage: {
    width: 120,  // Increased width
    height: 120, // Increased height
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 15, // Added margin
  },
  orderDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 22,  // Increased font size
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  customization: {
    fontSize: 16,  // Increased font size
    color: '#555555',
    marginBottom: 3,
  },
  quantity: {
    fontSize: 18,  // Increased font size
    color: '#000',
    marginTop: 10,
  },
  price: {
    fontSize: 18,  // Increased font size
    color: '#000',
  },
  total: {
    fontSize: 20,  // Increased font size
    fontWeight: '700',
    color: '#000',
    marginTop: 5,
  },
  listContent: {
    paddingVertical: 20,
  },
});

export default OrderPage;
