import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import {cleaningData} from '../../../constants/data';
import useDirection from '../../../hooks/useDirection';

const CleaningServices = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  return (
    <View>
      {/* Header */}
      <View
        style={[styles.headerContainer, isRTL && styles.headerContainerRTL]}>
        <View
          style={[styles.titleContainer, isRTL && styles.titleContainerRTL]}>
          <View style={styles.indicator} />
          <Text
            style={[
              styles.title,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {t('cleaningServices.title')}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.seeAllButton,
            {
              borderColor: isDarkMode ? '#616670' : '#EEEEEE',
            },
            isRTL && styles.seeAllButtonRTL,
          ]}>
          <Text
            style={[
              styles.seeAllText,
              {
                color: isDarkMode ? Colors.pureWhite : Colors.black,
              },
              isRTL && styles.seeAllTextRTL,
            ]}>
            {t('cleaningServices.seeAll')}
          </Text>
          <Icon
            name={isRTL ? 'chevron-back' : 'chevron-forward'}
            size={17}
            color={isDarkMode ? Colors.pureWhite : '#666C89'}
          />
        </TouchableOpacity>
      </View>

      {/* Services List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{transform: [{scaleX: isRTL ? -1 : 1}]}}
        contentContainerStyle={styles.scrollContent}>
        {cleaningData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, {transform: [{scaleX: isRTL ? -1 : 1}]}]}>
            {item.discount && (
              <View
                style={[styles.discountTag, isRTL && styles.discountTagRTL]}>
                <Text style={styles.discountText}>
                  {isRTL
                    ? `${item.discount} ${t('cleaningServices.discount')}`
                    : `${item.discount} ${t('cleaningServices.discount')}`}
                </Text>
              </View>
            )}
            <Image source={item.image} style={styles.cardImage} />
            <Text
              style={[
                styles.cardTitle,
                {color: isDarkMode ? Colors.white : Colors.black},
                isRTL && styles.textRTL,
              ]}>
              {t(item.title)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#172B4D',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  seeAllText: {
    fontSize: 13,
    color: '#666C89',
    marginRight: 4,
  },

  card: {
    width: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#172B4D',
    marginTop: 8,
  },
  discountTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4757',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    zIndex: 1,
    width: 75,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerContainerRTL: {
    flexDirection: 'row-reverse',
  },
  titleContainerRTL: {
    flexDirection: 'row-reverse',
  },
  seeAllButtonRTL: {
    flexDirection: 'row-reverse',
  },
  seeAllTextRTL: {
    marginRight: 0,
    marginLeft: 4,
  },
  textRTL: {
    textAlign: 'right',
  },
  discountTagRTL: {
    left: 'auto',
    right: 12,
  },
});

export default CleaningServices;
