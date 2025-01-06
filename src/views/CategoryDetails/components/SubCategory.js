import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import SearchBar from '../../../components/SearchBar';
import {useCustomTheme} from '../../../theme/Theme';

const SubCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  const [searchText, setSearchText] = useState('');

  const {category} = route.params;

  console.log('title', category?.title);
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
            placeholder="Search Sub Category"
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubCategory;

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
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
  },
});
