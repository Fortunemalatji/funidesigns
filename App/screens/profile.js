import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
//import Footer from './Footer'; 
import { SafeAreaView } from 'react-native-web';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profilePicture: 'https://example.com/profile.jpg',
  });

  const handleSave = () => {
    // Add save logic here
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  return (
    <SafeAreaView style={styles.safev}>
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: userInfo.profilePicture }} style={styles.profilePicture} />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          keyboardType="email-address"
        />
        
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={userInfo.phone}
          onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={userInfo.address}
          onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    <Footer />

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    safev:{
        height:'100%',
    },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007bff',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
