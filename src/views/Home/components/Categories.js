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
import {useTranslation} from 'react-i18next';

import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import useDirection from '../../../hooks/useDirection';
import {categoryData} from '../../../constants/data';

const Categories = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();
  const isDarkMode = theme === 'dark';

  const handleCategoryPress = category => {
    // navigation.navigate('CategoryDetails', {category});
  };

  const handleSeeAll = () => {
    navigation.navigate('CategoryDetails');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container]}
        style={isRTL ? {flexDirection: 'row-reverse'} : null}>
        {isRTL && (
          <TouchableOpacity
            style={styles.categoryWrapper}
            onPress={handleSeeAll}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode ? '#3B414D' : '#F5F5F5',
                  borderColor: isDarkMode ? '#6F767E' : '#ECECEC',
                  borderWidth: isDarkMode ? 1 : 1,
                },
              ]}>
              <Icon
                name="arrow-left"
                size={27}
                color={isDarkMode ? '#6F767E' : '#48465B'}
              />
            </View>
            <Text
              style={[
                styles.categoryTitle,
                {
                  color: isDarkMode ? Colors.pureWhite : Colors.black,
                },
                isRTL && styles.rtlText,
              ]}>
              {t('categories.title.seeAll')}
            </Text>
          </TouchableOpacity>
        )}

        {categoryData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryWrapper}
            onPress={() => handleCategoryPress(item)}>
            <View style={styles.iconContainer}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>
            <Text
              style={[
                styles.categoryTitle,
                {
                  color: isDarkMode ? Colors.pureWhite : Colors.black,
                },
                isRTL && styles.rtlText,
              ]}>
              {t(item.titleKey)}
            </Text>
          </TouchableOpacity>
        ))}

        {!isRTL && (
          <TouchableOpacity
            style={styles.categoryWrapper}
            onPress={handleSeeAll}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode ? '#3B414D' : '#F5F5F5',
                  borderColor: isDarkMode ? '#6F767E' : '#ECECEC',
                  borderWidth: isDarkMode ? 1 : 1,
                },
              ]}>
              <Icon
                name="arrow-right"
                size={27}
                color={isDarkMode ? '#6F767E' : '#48465B'}
              />
            </View>
            <Text
              style={[
                styles.categoryTitle,
                {
                  color: isDarkMode ? Colors.pureWhite : Colors.black,
                },
              ]}>
              {t('categories.title.seeAll')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // paddingVertical: 10,
  },
  container: {
    gap: 20,
  },
  categoryWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'center', // Keep text centered even in RTL
    writingDirection: 'rtl',
  },
});

export default Categories;
