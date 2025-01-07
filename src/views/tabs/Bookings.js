import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import Draft from '../Bookings/components/Draft';
import Upcoming from '../Bookings/components/Upcoming';
import History from '../Bookings/components/History';

const Bookings = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]); // Empty array for now

  const tabs = [
    {id: 'upcoming', label: 'Upcoming'},
    {id: 'history', label: 'History'},
    {id: 'draft', label: 'Draft'},
  ];

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
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      {/* Header */}
      <View style={styles.wrap}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.indicator} />
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              Bookings
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View style={styles.bodyWrap}>
          {activeTab === 'upcoming' ? (
            <Upcoming />
          ) : activeTab === 'history' ? (
            <History />
          ) : (
            <Draft />
          )}
        </View>
      </View>
    </View>
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
  wrap: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#ECE9FF', // Light purple background
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#6C63FF', // Purple text color
    fontWeight: '600',
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: Colors.pureWhite,
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
  bodyWrap: {
    flex: 1,
  },
});

export default Bookings;
