import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/home.png' }} style={styles.icon} />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={styles.footerItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/shopping-cart.png' }} style={styles.icon} />
        <Text style={styles.footerText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.footerItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/calendar.png' }} style={styles.icon} />
        <Text style={styles.footerText}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.footerItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user.png' }} style={styles.icon} />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Slightly taller for better usability
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#E9D8B7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  footerItem: {
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#555', // Softer color for a more professional look
  },
});

export default Footer;
