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
import images from '../../../constants/images';

const subCategoryList = [
  {
    id: 1,
    title: 'AC Check-Up',
    rating: 4.8,
    reviews: 87,
    price: 128,
    image: images.AcOne,
  },
  {
    id: 2,
    title: 'AC Regular Service',
    rating: 4.5,
    reviews: 87,
    price: 128,
    image: images.AcTwo,
  },
  {
    id: 3,
    title: 'AC Installation',
    rating: 4.5,
    reviews: 87,
    price: 170,
    image: images.AcThree,
  },
  {
    id: 4,
    title: 'AC Uninstallation',
    rating: 4.5,
    reviews: 87,
    price: 170,
    image: images.AcFour,
  },
];

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
    <TouchableOpacity key={item.id} style={styles.serviceCard}>
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC554" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
        <Text style={[styles.serviceTitle, isDarkMode && styles.darkText]}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starts From</Text>
          <View style={styles.priceTag}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <IconTwo name="ellipsis-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderGridView = item => (
    <TouchableOpacity key={item.id} style={styles.gridCard}>
      <Image source={item.image} style={styles.gridImage} />
      <View style={styles.gridInfo}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFC554" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
        <Text style={[styles.gridTitle, isDarkMode && styles.darkText]}>
          {item.title}
        </Text>
        <View style={styles.gridPriceContainer}>
          <Text style={styles.priceLabel}>Starts From</Text>
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
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, !isGridView && styles.activeToggle]}
              onPress={() => setIsGridView(false)}>
              <IconTwo
                name="list"
                size={20}
                color={!isGridView ? '#fff' : isDarkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, isGridView && styles.activeToggle]}
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
            style={isGridView ? styles.gridContainer : styles.listContainer}>
            {filteredSubCategories.map(item =>
              isGridView ? renderGridView(item) : renderListView(item),
            )}
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    // padding: 4,
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
    // paddingHorizontal: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    // padding: 12,
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
  reviews: {
    fontSize: 14,
    color: '#666',
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
  },
  priceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
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
    backgroundColor: '#fff',
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
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gridInfo: {
    padding: 12,
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
});

export default SubCategory;
