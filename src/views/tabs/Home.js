import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconTwo from 'react-native-vector-icons/FontAwesome';
import images from '../../constants/images';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Left Section with Menu and Location */}
        <View style={styles.leftSection}>
          <TouchableOpacity>
            <Icon name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>15A, James Street</Text>
              <Icon name="keyboard-arrow-down" size={24} color="#333" />
            </View>
          </View>
        </View>

        {/* Right Section with Points */}
        <View style={styles.pointsContainer}>
          <View>
            <Text style={styles.bronzeText}>BRONZE</Text>
            <Text style={styles.pointsText}>0 POINTS</Text>
          </View>
          <View style={styles.medalIcon}>
            <Image source={images.Badge} style={styles.badge} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,

    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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

export default Home;
