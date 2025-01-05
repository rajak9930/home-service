import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import SearchBar from '../../components/SearchBar';
import images from '../../constants/images';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';

const categoriesList = [
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
  {
    id: 4,
    title: 'Painting',
    image: images.categoryFour,
  },
  {
    id: 5,
    title: 'Cleaning',
    image: images.categoryFive,
  },
  {
    id: 6,
    title: 'Plumbing',
    image: images.categorySix,
  },
  {
    id: 7,
    title: 'Electronics',
    image: images.categorySeven,
  },
  {
    id: 8,
    title: 'Shifting',
    image: images.categoryEight,
  },
  {
    id: 9,
    title: "Men's Salon",
    image: images.categoryNine,
  },
];

const CategoryDetails = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      {/* Header with back button and search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar placeholder="Search Category" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.categoryWrap,
            isDarkMode ? styles.darkCategoryWrap : styles.lightCategoryWrap,
          ]}>
          <View style={styles.titleContainer}>
            <View style={styles.indicator} />
            <Text
              style={[
                styles.title,
                isDarkMode ? styles.darkTitle : styles.lightTitle,
              ]}>
              All Categories
            </Text>
          </View>

          <View style={styles.gridContainer}>
            {categoriesList.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                // onPress={() =>
                //   navigation.navigate('ServiceDetails', {category: item})
                // }
              >
                <View style={[styles.iconWrapper]}>
                  <Image source={item.image} style={styles.categoryIcon} />
                </View>
                <Text
                  style={[
                    styles.categoryTitle,
                    isDarkMode ? styles.darkText : styles.lightText,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  lightContainer: {
    // backgroundColor: Colors.primaryLight,
  },
  darkContainer: {
    // backgroundColor: Colors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
  },
  categoryWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    margin: 16,
    borderRadius: 12,
  },
  lightCategoryWrap: {
    backgroundColor: Colors.pureWhite,
  },
  darkCategoryWrap: {
    backgroundColor: Colors.navBg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  lightTitle: {
    color: '#172B4D',
  },
  darkTitle: {
    color: Colors.pureWhite,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  gridItem: {
    width: '30%',
    marginBottom: 24,
    alignItems: 'center',
  },
  iconWrapper: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: Colors.pureWhite,
  },
});

export default CategoryDetails;
