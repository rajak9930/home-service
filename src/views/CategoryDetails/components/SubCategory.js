import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const SubCategory = () => {
  const route = useRoute();

  const {category} = route.params;

  console.log(category?.title);
  return (
    <View>
      <Text>SubCategory</Text>
    </View>
  );
};

export default SubCategory;
