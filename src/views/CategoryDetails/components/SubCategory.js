import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconTwo from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import SearchBar from '../../../components/SearchBar';
import {useCustomTheme} from '../../../theme/Theme';
import {subCategoryList} from '../../../constants/data';

const SubCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(false);

  const {category} = route.params;

  const filteredSubCategories = searchText
    ? subCategoryList.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      )
    : subCategoryList;

  const renderListView = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetails', {service: item})}>
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC554" />
          <Text style={[styles.rating, isDarkMode && styles.darkRatingText]}>
            {item.rating}
          </Text>
          <Text style={[styles.reviews, isDarkMode && styles.darkReviewsText]}>
            ({item.reviews})
          </Text>
        </View>
        <Text style={[styles.serviceTitle, isDarkMode && styles.darkText]}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text
            style={[styles.priceLabel, isDarkMode && styles.darkPriceLabel]}>
            Starts From
          </Text>
          <View style={styles.priceTag}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <IconTwo name="ellipsis-horizontal" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderGridView = item => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.gridCard,
        isDarkMode ? styles.darkGridCard : styles.lightGridCard,
      ]}
      onPress={() => navigation.navigate('ServiceDetails', {service: item})}>
      <Image source={item.image} style={styles.gridImage} />
      <View style={styles.gridInfo}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFC554" />
          <Text style={[styles.rating, isDarkMode && styles.darkRatingText]}>
            {item.rating}
          </Text>
          <Text style={[styles.reviews, isDarkMode && styles.darkReviewsText]}>
            ({item.reviews})
          </Text>
        </View>
        <Text style={[styles.gridTitle, isDarkMode && styles.darkText]}>
          {item.title}
        </Text>
        <View style={styles.gridPriceContainer}>
          <Text
            style={[styles.priceLabel, isDarkMode && styles.darkPriceLabel]}>
            Starts From
          </Text>
          <View style={styles.priceTag}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View
        style={[
          styles.header,
          isDarkMode ? styles.darkHeader : styles.lightHeader,
        ]}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search Category"
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </View>
      </View>

      {category?.title === 'AC Repair' ? (
        <>
          <View
            style={[
              styles.contentContainer,
              isDarkMode ? styles.darkContent : styles.lightContent,
            ]}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <View style={styles.indicator} />
                <Text
                  style={[
                    styles.title,
                    isDarkMode ? styles.darkText : styles.lightText,
                  ]}>
                  {category?.title || 'Appliance Repair'}
                </Text>
              </View>
              <View
                style={[
                  styles.viewToggle,
                  isDarkMode ? styles.darkViewToggle : styles.lightViewToggle,
                ]}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    !isGridView && styles.activeToggle,
                  ]}
                  onPress={() => setIsGridView(false)}>
                  <IconTwo
                    name="list"
                    size={20}
                    color={!isGridView ? '#fff' : isDarkMode ? '#fff' : '#333'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    isGridView && styles.activeToggle,
                  ]}
                  onPress={() => setIsGridView(true)}>
                  <IconTwo
                    name="grid"
                    size={20}
                    color={isGridView ? '#fff' : isDarkMode ? '#fff' : '#333'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={
                  isGridView ? styles.gridContainer : styles.listContainer
                }>
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map(item =>
                    isGridView ? renderGridView(item) : renderListView(item),
                  )
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
            </ScrollView>
          </View>
        </>
      ) : (
        <View style={styles.noResultsContainer}>
          <Text
            style={[
              styles.noResultsText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            Coming Soon...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  lightHeader: {
    backgroundColor: Colors.pureWhite,
  },
  darkHeader: {
    backgroundColor: Colors.navBg,
  },
  searchContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  lightContent: {
    backgroundColor: Colors.pureWhite,
  },
  darkContent: {
    backgroundColor: Colors.navBg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  lightText: {
    color: '#172B4D',
  },
  darkText: {
    color: Colors.pureWhite,
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: 6,
  },
  lightViewToggle: {
    backgroundColor: '#F5F5F5',
  },
  darkViewToggle: {
    backgroundColor: Colors.primaryDark,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: Colors.primary,
  },
  listContainer: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 16,
    paddingBottom: 16,
  },
  serviceImage: {
    width: 105,
    height: 105,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  darkRatingText: {
    color: Colors.pureWhite,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  darkReviewsText: {
    color: Colors.lightGray,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
  priceContainer: {
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  darkPriceLabel: {
    color: Colors.lightGray,
  },
  priceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  moreButton: {
    padding: 8,
  },
  gridCard: {
    width: '48%',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lightGridCard: {
    backgroundColor: Colors.pureWhite,
  },
  darkGridCard: {
    backgroundColor: Colors.navBg,
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gridInfo: {
    paddingVertical: 12,
    paddingLeft: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
  gridPriceContainer: {
    marginTop: 4,
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

export default SubCategory;
