import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
//import Footer from '/App/screens/Footer';


const { width, height } = Dimensions.get('window');

const CustomizeFurniturePage = ({ route }) => {
  const { id } = route.params; // Retrieve the product ID from the route parameters
  const [productData, setProductData] = useState(null);
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Fetch product data based on ID
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setProductData(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => console.error('Error fetching product data:', error));

    // Fetch components data
    fetch('http://localhost:5000/api/components')
      .then(response => response.json())
      .then(data => {
        setComponents(data);
      })
      .catch(error => console.error('Error fetching components:', error));
  }, [id]);

  const handleOptionSelect = (componentName, value) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [componentName]: value
    }));
  };

  const toggleDropdown = (componentName) => {
    setSelectedComponent(prev => (prev === componentName ? null : componentName));
  };

  const removeComponent = (componentName) => {
    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions };
      delete newOptions[componentName];
      return newOptions;
    });
    setSelectedComponent(null); 
  };

  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX0lEIjo1LCJpYXQiOjE3MjQ2NzcyNjUsImV4cCI6MTcyNDY4MDg2NX0.Hy4eeteLaB_a7KupFLsMORKGwqCpFJhH2hVwYVF-6u0';
  const saveCustomizations = () => {
    fetch('http://localhost:5000/api/addCustomization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        prod_ID: 4, 
        cus_Type: "modern", 
        cus_Option: "selectedOptions", 
        components: "selectedComponent" 
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Customization saved:', data);
      // Handle success (e.g., show a message or update state)
    })
    .catch(error => {
      console.error('Error saving customization:', error);
      // Handle error (e.g., show an error message)
    });
  };
  
  
  

  const addToCart = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX0lEIjo1LCJpYXQiOjE3MjQ0NzE1NzMsImV4cCI6MTcyNDQ3NTE3M30.R4ZiuG4KpcRhMShNT6f_OGya-rksv9npNWrvcWT71CI'; // Retrieve JWT token from secure storage or context
    const cartData = {
      prod_ID: id,
      customizations: selectedOptions,
    };
  
    fetch('http://localhost:5000/api/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Send the token in the Authorization header
      },
      body: JSON.stringify(cartData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Alert.alert('Error', data.error);
          navigation.navigate('cart');

        } else {
          Alert.alert('Success', 'Item added to cart successfully!');
          
        }
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        Alert.alert('Error', 'An error occurred while adding to cart.');
      });
  };

  const renderComponentName = ({ item }) => (
    <TouchableOpacity
      style={styles.componentNameContainer}
      onPress={() => toggleDropdown(item.comp_Name)}
    >
      <Text style={styles.componentName}>{item.comp_Name}</Text>
    </TouchableOpacity>
  );

  const renderDropdownOptions = (component) => (
    <View style={styles.dropdownContainer}>
      <FlatList
        data={[component.material, component.color].filter(Boolean)} // Filter out undefined/null
        horizontal
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionValue,
              selectedOptions[component.comp_Name] === item && styles.optionValueSelected
            ]}
            onPress={() => handleOptionSelect(component.comp_Name, item)}
          >
            <Text style={styles.optionValueText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.optionsScrollContainer}
      />
      {component.image && (
        <Image
          source={{ uri: component.image }}
          style={styles.componentImage}
          onError={() => console.error('Error loading image:', component.image)}
        />
      )}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeComponent(component.comp_Name)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFurnitureItem = ({ item }) => (
    <View style={styles.furnitureItem}>
      <Image
        source={{ uri: item.Image }}
        style={styles.furnitureImage}
        onError={() => console.error('Error loading image:', item.Image)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.furnitureName}>{item.name}</Text>
        <FlatList
          data={components}
          horizontal
          keyExtractor={(item) => item.comp_ID.toString()}
          renderItem={renderComponentName}
          contentContainerStyle={styles.componentNamesContainer}
        />
        {components.map(component => (
          selectedComponent === component.comp_Name && renderDropdownOptions(component)
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {productData ? (
        <FlatList
          data={[productData]}
          renderItem={renderFurnitureItem}
          keyExtractor={(item) => item.id ? item.id.toString() : 'default-key'}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveCustomizations}>
          <Text style={styles.saveButtonText}>customize </Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  furnitureItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    marginVertical: 15,
    overflow: 'hidden',
    width: width - 40,
    alignSelf: 'center',
  },
  furnitureImage: {
    width: '100%',
    height: height * 0.5,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  furnitureName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  componentNamesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  componentNameContainer: {
    paddingHorizontal: 5,
  },
  componentName: {
    backgroundColor: '#E9D8B7',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
     padding: 10,
     margin:5,
  },
  dropdownContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  optionsScrollContainer: {
    flexDirection: 'row',
  },
  optionValue: {
    backgroundColor: 'grey',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  optionValueSelected: {
    backgroundColor: '#E9D8B7',
  },
  optionValueText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  componentImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    padding: 10,
  },
  removeButtonText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: 'black',
    color:'white',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default CustomizeFurniturePage;
