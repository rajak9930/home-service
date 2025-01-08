import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconOne from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedBookedService} from '../../../redux/bookedService/bookedServiceSlice';

const Upcoming = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';
  const futureBookings = useTypedSelector(selectedBookedService);

  if (!futureBookings?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Image source={images.Upcoming} style={styles.emptyImage} />
        <Text style={[styles.noOrderText, isDarkMode && styles.darkText]}>
          No Upcoming Order
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          Currently you don't have any upcoming order.
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          Place and track your orders from here.
        </Text>
        <TouchableOpacity
          style={styles.viewServicesButton}
          onPress={() => navigation.navigate('CategoryDetails')}>
          <Text style={styles.buttonText}>View all services</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, isDarkMode && styles.darkWrap]}>
      {futureBookings.map((booking, index) => (
        <View key={index} style={[styles.card, isDarkMode && styles.darkCard]}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.serviceIcon}>
              <Text style={styles.serviceIconText}>W</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, isDarkMode && styles.darkText]}>
                {booking.service.title}
              </Text>
              <Text style={styles.reference}>Reference Code: #D-571224</Text>
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>

          {/* Schedule Section */}
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <IconOne
                name="calendar-outline"
                size={24}
                color={Colors.lightGray}
              />
            </View>
            <Text style={[styles.scheduleText, isDarkMode && styles.darkText]}>
              {new Date(booking.selectedDate).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>

          {/* Provider Section */}
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <Image source={images.Upcoming} style={styles.providerIcon} />
            </View>
            <View>
              <Text
                style={[styles.providerName, isDarkMode && styles.darkText]}>
                Westinghouse
              </Text>
              <Text style={styles.providerLabel}>Service provider</Text>
            </View>
          </View>

          {/* Call Button */}
          <TouchableOpacity style={styles.callButton}>
            <IconOne name="call" size={24} color={Colors.pureWhite} />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  noOrderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  darkSubText: {
    color: Colors.darkLightGray,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  viewServicesButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.pureWhite,
    borderRadius: 12,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: Colors.navBg,
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9457',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.black,
  },
  reference: {
    color: Colors.lightGray,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    color: Colors.lightGray,
    marginRight: 12,
  },
  iconWrapper: {
    marginRight: 12,
  },
  scheduleText: {
    fontSize: 16,
    color: Colors.black,
  },
  providerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  providerLabel: {
    color: Colors.lightGray,
    fontSize: 14,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  callButtonText: {
    color: Colors.pureWhite,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Upcoming;
