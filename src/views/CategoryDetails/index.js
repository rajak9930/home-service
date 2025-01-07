import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import SearchBar from '../../components/SearchBar';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import {categoriesList} from '../../constants/data';

const CategoryDetails = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  const [searchText, setSearchText] = useState('');

  const filteredCategories = searchText
    ? categoriesList.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      )
    : categoriesList;

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
          },
        ]}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search Category"
            searchText={searchText}
            setSearchText={setSearchText}
          />
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
              {searchText ? 'Search Results' : 'All Categories'}
            </Text>
          </View>

          <View style={styles.gridContainer}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridItem}
                  onPress={() =>
                    navigation.navigate('SubCategory', {category: item})
                  }>
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
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text
                  style={[
                    styles.noResultsText,
                    isDarkMode ? styles.darkText : styles.lightText,
                  ]}>
                  No categories found
                </Text>
              </View>
            )}
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
    backgroundColor: Colors.primaryLight,
  },
  darkContainer: {
    backgroundColor: Colors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
  noResultsContainer: {
    width: '100%',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CategoryDetails;
