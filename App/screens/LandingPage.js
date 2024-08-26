import React from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';


//import {Footer} from 'App/components/Footer.js';

const imageList = [
  {
    id: '1',
    uri: 'https://th.bing.com/th/id/R.4b2f00bf3b1045b86fdeb769c40cc8f9?rik=O%2f9Sqi9xHpMtuQ&pid=ImgRaw&r=0',
  },
  {
    id: '2',
    uri: 'https://i.pinimg.com/originals/19/b6/e1/19b6e11237c62e30a0ba84d8aade6b87.jpg',
  },
  {
    id: '1',
    uri: 'https://th.bing.com/th/id/R.4b2f00bf3b1045b86fdeb769c40cc8f9?rik=O%2f9Sqi9xHpMtuQ&pid=ImgRaw&r=0',
  },
  {
    id: '2',
    uri: 'https://i.pinimg.com/originals/19/b6/e1/19b6e11237c62e30a0ba84d8aade6b87.jpg',
  },  {
    id: '1',
    uri: 'https://th.bing.com/th/id/R.4b2f00bf3b1045b86fdeb769c40cc8f9?rik=O%2f9Sqi9xHpMtuQ&pid=ImgRaw&r=0',
  },
  {
    id: '2',
    uri: 'https://i.pinimg.com/originals/19/b6/e1/19b6e11237c62e30a0ba84d8aade6b87.jpg',
  },
  
];

const nCols = 1;

const LandingPage = () => {
  const navigation = useNavigation();

  const handleImagePress = (item) => {
    navigation.navigate('eventpage', { itemId: item.id });
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  const renderGridItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.imageContainer}>
      <Image source={{ uri: item.Image }} style={styles.imageItem} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.prod_name}</Text>
        <Text style={styles.price}>Price: R {item.prod_price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.customizeButton}>
            <Text style={styles.buttonText}
            onPress={() => navigation.navigate('eventpage', { id: item.prod_id })}
            >Customize </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchBar}
          />
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/shopping-cart.png' }} 
          style={styles.profileImage}
          />
          </TouchableOpacity>
          
        </View>
        {/*<ScrollView horizontal style={styles.tabBar} contentContainerStyle={styles.tabBarContent}>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Top Charts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabItem}> Latest</Text>
          </TouchableOpacity>
          {/* Add more tabs as needed *
        </ScrollView>*/}
        <ScrollView>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
          data={products}
          renderItem={renderGridItem}
          keyExtractor={item => item.prod_id}
          />

          <Text style={styles.sectionTitle}>Top Charts</Text>
          <FlatList
            data={imageList}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={nCols}
            contentContainerStyle={styles.flatListContent}
            
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 40) / nCols;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor:'#F5F5DC',
   
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E9D8B7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    color: 'orange',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabBar: {
    height: 60,
    backgroundColor: 'white',
  },
  tabBarContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: {
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'orange',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  flatListContent: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageItem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  customizeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },


  
});

export default LandingPage;
