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
import {useTranslation} from 'react-i18next';
import useDirection from '../../hooks/useDirection';

const CategoryDetails = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

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
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder={t('allCategories.searchCategory')}
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
          <View
            style={[
              styles.titleContainer,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <View
              style={[
                styles.indicator,
                {marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0},
              ]}
            />
            <Text
              style={[
                styles.title,
                isDarkMode ? styles.darkTitle : styles.lightTitle,
              ]}>
              {searchText
                ? t('allCategories.searchResults')
                : t('allCategories.allCategories')}
            </Text>
          </View>

          <View
            style={[
              styles.gridContainer,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.gridItem]}
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
                      {textAlign: isRTL ? 'right' : 'center'},
                    ]}>
                    {t(item.title)}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text
                  style={[
                    styles.noResultsText,
                    isDarkMode ? styles.darkText : styles.lightText,
                    isRTL && styles.rtlText,
                  ]}>
                  {t('allCategories.noCategoriesFound')}
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
  rtlText: {
    textAlign: 'left',
  },
});

export default CategoryDetails;
