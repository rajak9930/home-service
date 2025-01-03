import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';

const TopBar = () => {
  const theme = useCustomTheme();

  const background = theme === 'dark' ? Colors.navBg : Colors.pureWhite;

  return (
    <View style={[styles.header, {backgroundColor: background}]}>
      <View style={styles.leftSection}>
        <TouchableOpacity>
          <Icon
            name="menu"
            size={24}
            color={theme === 'dark' ? Colors.pureWhite : Colors.primaryDark}
          />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text
            style={[
              styles.locationLabel,
              {
                color: theme === 'dark' ? Colors.darkLightGray : Colors.black,
              },
            ]}>
            CURRENT LOCATION
          </Text>
          <View style={styles.addressContainer}>
            <Text
              style={[
                styles.addressText,
                {
                  color: theme === 'dark' ? Colors.pureWhite : Colors.black,
                },
              ]}>
              15A, James Street
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={24}
              color={theme === 'dark' ? Colors.pureWhite : Colors.primaryDark}
            />
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <View>
          <Text style={styles.bronzeText}>BRONZE</Text>
          <Text
            style={[
              styles.pointsText,
              {
                color: theme === 'dark' ? Colors.darkLightGray : Colors.black,
              },
            ]}>
            0 POINTS
          </Text>
        </View>
        <View style={styles.medalIcon}>
          <Image source={images.Badge} style={styles.badge} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationContainer: {
    marginLeft: 8,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  bronzeText: {
    fontSize: 14,
    color: '#F4BF4B',
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 12,
    color: '#636A75',
    borderBottomWidth: 1,
    borderBottomColor: '#636A75',
  },
  badge: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default TopBar;
