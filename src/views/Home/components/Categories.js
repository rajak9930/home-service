import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';

const categoryData = [
  {
    id: 1,
    title: 'AC Repair',
    image: images.categoryOne,
  },
  {
    id: 2,
    title: 'Beauty',
    image: images.categoryTwo,
  },
  {
    id: 3,
    title: 'Appliance',
    image: images.categoryThree,
  },
];

const Categories = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  const handleCategoryPress = category => {
    // navigation.navigate('CategoryDetails', {category});
  };

  const handleSeeAll = () => {
    navigation.navigate('CategoryDetails');
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categoryData.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.categoryWrapper}
          onPress={() => handleCategoryPress(item)}>
          <View style={[styles.iconContainer]}>
            <Image source={item.image} style={styles.categoryImage} />
          </View>
          <Text
            style={[
              styles.categoryTitle,
              {
                color: isDarkMode ? Colors.pureWhite : Colors.black,
              },
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}

      {/* See All Button */}
      <TouchableOpacity style={styles.categoryWrapper} onPress={handleSeeAll}>
        <View style={[styles.iconContainer, styles.iconBG]}>
          <Icon name="arrow-right" size={27} color="#48465B" />
        </View>
        <Text
          style={[
            styles.categoryTitle,
            {
              color: isDarkMode ? Colors.pureWhite : Colors.black,
            },
          ]}>
          See All
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  categoryWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 59,
    height: 59,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconBG: {
    backgroundColor: '#F5F5F5',
  },
  categoryImage: {
    width: 59,
    height: 59,
    resizeMode: 'contain',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#48465B',
  },
});

export default Categories;
