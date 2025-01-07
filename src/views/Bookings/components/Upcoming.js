import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../constants/colors';
import images from '../../../constants/images';
import {useNavigation} from '@react-navigation/native';
import {useCustomTheme} from '../../../theme/Theme';

const Upcoming = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  const [bookings, setBookings] = useState([]); // Empty array for now

  const renderNoBookings = () => (
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

  const renderContent = () => {
    if (bookings.length === 0) {
      return renderNoBookings();
    }
    // Add your bookings list view here when there are bookings
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Upcoming;
