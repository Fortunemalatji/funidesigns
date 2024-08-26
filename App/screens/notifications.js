import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Sample notifications data
const notifications = [
  { id: '1', title: 'Order Shipped', message: 'Your order #12345 has been shipped and is on its way.' },
  { id: '2', title: 'Customization Approved', message: 'Your furniture customization has been approved. It will be processed soon.' },
  { id: '3', title: 'Special Offer', message: 'Get 20% off on your next purchase. Use code: SAVE20' },
  { id: '4', title: 'Profile Update', message: 'Your profile information has been updated successfully.' },
];

const NotificationItem = ({ notification }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.notificationHeader}>
      <Text style={styles.notificationTitle}>{notification.title}</Text>
    </View>
    <Text style={styles.notificationMessage}>{notification.message}</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <FlatList
      data={notifications}
      renderItem={({ item }) => <NotificationItem notification={item} />}
      keyExtractor={item => item.id}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  notificationHeader: {
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#E9D8B7',
  },
});

export default NotificationsScreen;
