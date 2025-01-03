import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';

const TopBar = () => {
  const theme = useCustomTheme();
  const themedStyles = getThemedStyles(theme);

  return (
    <View style={[styles.header, themedStyles.headerBackground]}>
      <View style={styles.leftSection}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color={themedStyles.iconColor} />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text style={[styles.locationLabel, themedStyles.textSecondary]}>
            CURRENT LOCATION
          </Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.addressText, themedStyles.textPrimary]}>
              15A, James Street
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={24}
              color={themedStyles.iconColor}
            />
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <View>
          <Text style={styles.bronzeText}>BRONZE</Text>
          <Text style={[styles.pointsText, themedStyles.textSecondary]}>
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

const getThemedStyles = theme => ({
  headerBackground: {
    backgroundColor: theme === 'dark' ? Colors.navBg : Colors.pureWhite,
  },
  textPrimary: {
    color: theme === 'dark' ? Colors.pureWhite : Colors.black,
  },
  textSecondary: {
    color: theme === 'dark' ? Colors.darkLightGray : Colors.black,
  },
  iconColor: theme === 'dark' ? Colors.pureWhite : Colors.primaryDark,
});

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
    marginBottom: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
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
