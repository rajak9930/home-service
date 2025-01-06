import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const ServiceDetails = () => {
  const route = useRoute();
  const {service} = route.params;

  console.log('service', service);

  return (
    <View>
      <Text>ServiceDetails</Text>
    </View>
  );
};

export default ServiceDetails;
