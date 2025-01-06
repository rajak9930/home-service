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

import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import {cleaningData} from '../../../constants/data';

const CleaningServices = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.indicator} />
          <Text
            style={[
              styles.title,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            Cleaning Services
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.seeAllButton,
            {
              borderColor: isDarkMode ? '#616670' : '#EEEEEE',
            },
          ]}>
          <Text
            style={[
              styles.seeAllText,
              {
                color: isDarkMode ? Colors.pureWhite : Colors.black,
              },
            ]}>
            See All
          </Text>
          <Icon
            name="chevron-forward"
            size={17}
            color={isDarkMode ? Colors.pureWhite : '#666C89'}
          />
        </TouchableOpacity>
      </View>

      {/* Services List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {cleaningData.map(item => (
          <TouchableOpacity key={item.id} style={styles.card}>
            {item.discount && (
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
            <Image source={item.image} style={styles.cardImage} />
            <Text
              style={[
                styles.cardTitle,
                {color: isDarkMode ? Colors.white : Colors.black},
              ]}>
              {item.title}
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
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CleaningServices;
