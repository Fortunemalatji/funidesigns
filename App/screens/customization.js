import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
//import { get } from 'react-native-cookies';


const AddCustomization = () => {
  const [productId, setProductId] = useState('');
  const [customizationType, setCustomizationType] = useState('');
  const [customizationOption, setCustomizationOption] = useState('');
  //const sessionToken = get('sessionToken');


  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        '/addCustomization',
        {
          productId,
          customizationType,
          customizationOption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Product ID:</Text>
      <TextInput
        value={productId}
        onChangeText={(text) => setProductId(text)}
      />
      <Text>Customization Type:</Text>
      <TextInput
        value={customizationType}
        onChangeText={(text) => setCustomizationType(text)}
      />
      <Text>Customization Option:</Text>
      <TextInput
        value={customizationOption}
        onChangeText={(text) => setCustomizationOption(text)}
      />
      <Button title="Add Customization" onPress={handleSubmit} />
    </View>
  );
};

export default AddCustomization;
